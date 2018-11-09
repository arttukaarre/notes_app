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
      memos: [
        { id: "1", name: "nimi", tags: "test,test2,test3", content: "tekstiä tekstiä tekstiä tekstiä"},
        { id: "2", name: "nimi 2", tags: "test,test2,test3", content: "tekstiä tekstiä tekstiä tekstiä"},
        { id: "3", name: "nimi 33333", tags: "test,test2,test3", content: "tekstiä tekstiä tekstiä tekstiä"}
      ]
    }



  }

  clicked() {
    console.log("clocked")
    dbMemos.insert({name: 'memo', data: '123123123̈́', tags: ["tagi1", "tagi2", "tagi3"]});
    dbMemos.insert({name: 'memo2', data: '123123123̈́', tags: ["tagi1", "tagi2"], active: true});
    dbMemos.insert({name: 'memo3', data: '123123123̈́', tags: ["tagi2", "tagi3"]});
    dbMemos.insert({name: 'memo4', data: '123123123̈́', tags: ["tagi1", "tagi3"]});
  }

  clicked3() {
    console.log("clocked3")
    let data = dbMemos.getAllData()
    console.log(data);
  }


  componentDidMount() {

    console.log("component did mount")
    this.findActiveMemo((activeMemo) => {
      console.log("found active memo", activeMemo)
      this.setActiveMemo(activeMemo)
    });


    dbMemos.getAllData((data, error) => {
      console.log("data", data)
      console.log("error", error)
    })

  }

  setActiveMemo(activeMemo) {
    this.setState({activeMemo});
  }

  findMemosByTagNames(tags, callback) {
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

  saveMemo(memo, errorCallback) {
    console.debug("Saving memo", memo)
    dbMemos.insert(memo, function(error, newDocs) {
      if (error) {
        errorCallback(error);
      }
      console.debug("Saved a new memo - ", newDocs)
    });
  }

  findActiveMemo(callback) {
    console.debug("Finding active memo")
    dbMemos.find({ active: true }, (err, data) => {
      if (data.length > 0) {
        callback(data[0])
      }
    })
  }

  render() {
    return (
        <div className="notesBase">
          <ListWrapper
              findMemosByTag={this.findMemosByTagNames.bind()}
              saveMemo={this.saveMemo.bind()}
              setActiveMemo={this.setActiveMemo.bind()}
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
