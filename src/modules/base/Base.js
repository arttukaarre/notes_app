import React, { Component } from 'react';
import EditorWrapper from '../editorWrapper/EditorWrapper'
import List from '../listWrapper/ListWrapper'
import '../../App.css'

class Base extends Component {

  // fetch memos
  // figure out active memo


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
          <List
              memos={this.state.memos}
          />
          <EditorWrapper
              memo="memo"
          />
        </div>
    );
  }
}

export default Base;
