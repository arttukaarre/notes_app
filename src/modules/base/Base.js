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
      memos: [],
      filteredMemos: [],
      filterString: "",
      activeMemo: {},
      activeMemoId: ""
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
      this.setState({ memos: data, filteredMemos: data })
    })


  }

  setActiveMemo = (activeMemo) => {
    this.setState({activeMemo: activeMemo});
  }

  filterMemosByTagNames = (tags) => {

    if (tags === "") {
      this.setState({filteredMemos: this.state.memos})
      return
    }

    if (!Array.isArray(tags)){
      tags = [tags]
    }

    dbMemos.find({
          $where: function () {
            for (let i = 0; i < tags.length; i++) {
              for (let j = 0; j < this.tags.length; j++) {
                if (this.tags[j].indexOf(tags[i]) > -1){
                  return true;
                }
              }
            }
            return false;
          }},
        (err, data) => {
          console.debug("Searched memos with tags: ", tags);
          console.debug("Found memos: ", data);
          //callback(data);
          this.setState({filteredMemos: data, filterString: tags})

        })
  }

  saveMemo = (memo, errorCallback) => {
    console.debug("Saving memo", memo);

    dbMemos.update({ _id: memo._id }, { $set: { title: memo.title, data: memo.data, tags: memo.tags }}, (error, newDocs) => {
      if (error) {
        errorCallback(error);
      }

      console.log(error)

      console.log(newDocs, "newdocs")

      console.debug("Saved a new memo - ", newDocs)
      console.log("setting new state memos")

      let newMemos = this.state.memos;
      console.log(newMemos);

      for (let i = 0; i < newMemos.length; i++) {
        if (newMemos[i]._id === memo._id) {
          newMemos[i] = memo;
        }
      }

      this.setState({memos: newMemos})

    })
  }

  createMemo = (memo) => {
    console.debug("Saving memo", memo);

    dbMemos.insert(memo, (error, newDocs) => {

      console.debug("Saved a new memo - ", newDocs)
      console.log("setting new state memos")

      this.findAllMemos((docs) => {
        this.setState({memos: docs})
        this.filterMemosByTagNames(this.state.filterString)
      })

    })

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
              className={"listWrapper"}
              filterMemosByTagNames={this.filterMemosByTagNames}
              saveMemo={this.saveMemo}
              createMemo={this.createMemo}
              findAllMemos={this.findAllMemos}
              setActiveMemo={this.setActiveMemo}
              removeAllMemos={this.removeAllMemos}
              memos={this.state.filteredMemos}
          />
          <EditorWrapper
              memo={this.state.activeMemo}
              saveMemo={this.saveMemo}
          />
        </div>
    );
  }
}

export default Base;
