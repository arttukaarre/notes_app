import React, { Component } from 'react';
import TagContainer from '../tagContainer/TagContainer';
import Title from '../title/Title';
import Editor from '../editor/Editor';
import '../../App.css';

class EditorWrapper extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "",
      tags: "",
      body: ""
    }
  }

  render() {
    return (
        <div className="editorWrapper">
          <Title title={this.props.title}/>
          <TagContainer/>
          <Editor/>
        </div>
    );
  }
}

export default EditorWrapper;
