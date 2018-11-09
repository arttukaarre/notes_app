import React, { Component } from 'react';
import EditorWrapper from '../editor/EditorWrapper'
import List from '../list/ListWrapper'

class Base extends Component {

  // fetch memos

  // figure out active memo


  render() {
    return (
        <div className="notes_base">
          wrapper!
          <List
              memos="data"
          />
          <EditorWrapper
              memo="memo"
          />
        </div>
    );
  }
}

export default Base;
