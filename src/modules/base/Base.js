import React, { Component } from 'react';
import Datastore from 'nedb'

import EditorWrapper from '../editorWrapper/EditorWrapper'
import ListWrapper from '../listWrapper/ListWrapper'
import '../../App.css'

const dbMemos = new Datastore({ filename: 'memos.db', inMemoryOnly: false, autoload: true, timestampData: true })

class Base extends Component {

  constructor(props) {
    super(props);
    // DB
    dbMemos.loadDatabase((error) => {
      if (error) {
        console.log(error);
      }
    })

    this.state = {
      memos: []
    }

  }

  findAllMemos(callback) {
    console.log("clocked3")
    dbMemos.find({}, (err, memos) => {
      console.debug("Searched for all memos: ", memos);
      callback(memos)
    })
  }

  componentDidMount() {

    console.log("component did mount")
    this.findActiveMemo((activeMemo) => {
      console.log("found active memo", activeMemo)
      this.setActiveMemo(activeMemo)
    });

    console.debug("Finding all data")
    this.findAllMemos((data) => {
      this.setState({ memos: data })
    })


  }

  setActiveMemo = (activeMemo) => {
    this.setState({activeMemo});
  }

  findMemosByTagNames = (tags, callback) => {
    if (!Array.isArray(tags)){
      tags = [tags]
    }

    dbMemos.find({
          $where: function () {
            for (let i = 0; i < tags.length; i++) {
              if (this.tags.indexOf(tags[i]) === -1){
                return false;
              }
            }
            return true;
          }},
        (err, data) => {
          console.debug("Searched memos with tags: ", tags);
          console.debug("Found memos: ", data);
          callback(data);
        })
  }

  saveMemo = (memo, errorCallback) => {
    console.debug("Saving memo", memo)

    dbMemos.insert(memo, function(error, newDocs) {
      if (error) {
        errorCallback(error);
      }

      console.debug("Saved a new memo - ", newDocs)
      console.log("setting new state memos")

      this.setState(prevState => ({
        memos: [...prevState.memos, memo]
      }))

    }.bind(this))
  }

  findActiveMemo = (callback) => {
    console.debug("Finding active memo")
    dbMemos.find({ active: true }, (err, data) => {
      if (data.length > 0) {
        callback(data[0])
      }
    })
  }

  removeAllMemos = () => {
    dbMemos.remove({}, { multi: true })
    this.setState({ memos: [] })
  }

  render() {
    return (
        <div className="notesBase">
          <ListWrapper
              findMemosByTagNames={this.findMemosByTagNames.bind()}
              saveMemo={this.saveMemo.bind()}
              findAllMemos={this.findAllMemos.bind()}
              setActiveMemo={this.setActiveMemo.bind()}
              removeAllMemos={this.removeAllMemos.bind()}
              memos={this.state.memos}
          />
          <EditorWrapper
              memo={this.state.activeMemo}
          />
        </div>
    );
  }
}

export default Base;
