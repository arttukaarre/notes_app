import React, { Component } from 'react';
import TagContainer from '../tagContainer/TagContainer';
import Title from '../title/Title';
import '../../App.css';

class EditorWrapper extends Component {


  render() {
    return (
        <div className="editorWrapper">
          editor!
          <Title title={this.props.title}/>
          <TagContainer/>

          {/*<Title>

          </Title>
          <TagsContainer>
          </TagsContainer>
          <Editor></Editor>*/}
        </div>
    );
  }
}

export default EditorWrapper;
