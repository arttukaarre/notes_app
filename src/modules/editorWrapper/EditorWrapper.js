import React, { Component } from 'react';
import TagContainer from '../tagContainer/TagContainer';
import Title from '../title/Title';
import Editor from '../editor/Editor';
import '../../App.css';

class EditorWrapper extends Component {
  render() {
    return (
        <div className="editorWrapper">
          <Title saveMemo={this.props.saveMemo} memo={this.props.memo}/>
          <TagContainer saveMemo={this.props.saveMemo} memo={this.props.memo}/>
          <Editor saveMemo={this.props.saveMemo} memo={this.props.memo}/>
        </div>
    );
  }
}

export default EditorWrapper;
