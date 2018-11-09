import React, { Component } from 'react';
import Datastore from 'nedb'

import List from '../list/ListWrapper'
import EditorWrapper from '../editorWrapper/EditorWrapper'
import List from '../listWrapper/ListWrapper'
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



  }

  clicked() {
    console.log("clocked")
    dbMemos.insert({name: 'memo', data: '123123123̈́', tags: ["tagi1", "tagi2", "tagi3"]});
    dbMemos.insert({name: 'memo2', data: '123123123̈́', tags: ["tagi1", "tagi2"]});
    dbMemos.insert({name: 'memo3', data: '123123123̈́', tags: ["tagi2", "tagi3"]});
    dbMemos.insert({name: 'memo4', data: '123123123̈́', tags: ["tagi1", "tagi3"]});
  }

  clicked3() {
    console.log("clocked3")
    let data = dbMemos.getAllData()
    console.log(data);
  }


  componentDidMount() {

    this.findActiveMemo((activeMemo) => {
      this.setActiveMemo(activeMemo)
    });

    dbMemos.getAllData()

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
    dbMemos.insert(memo, function(error, newDocs) {
      if (error) {
        errorCallback(error);
      }
      console.debug("Saved a new memo - ", newDocs)
    });
  }

  findActiveMemo(callback) {
    dbDemos.find({ active: true }, (err, data) => {
      callback(data)
    })
  }


  constructor(props){
    super(props);
    this.state = {
        memos: [
            { id: "1", name: "nimi", tags: "test,test2,test3", content: "tekstiä tekstiä tekstiä tekstiä"},
            { id: "2", name: "nimi 2", tags: "test,test2,test3", content: "tekstiä tekstiä tekstiä tekstiä"},
            { id: "3", name: "nimi 33333", tags: "test,test2,test3", content: "tekstiä tekstiä tekstiä tekstiä"}
        ]
    }
  }

  componentDidMount(){
      // fetchMemos();
  }

  fetchMemos = () => {
      // ota yhteys kantaan? tjsp
      // lisää memot stateen or something
  }

  render() {
    return (
        <div className="notesBase">
          <button onClick={this.clicked}>add</button>
          <button onClick={() => this.findMemosByTagNames(["tagi2"], (tags) => {console.log("tags", tags)})}>222</button>
          <button onClick={this.clicked3}>print all</button>
          <List
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
