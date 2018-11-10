import React, { Component } from 'react';

class Editor extends Component {

    handleChange = (event) => {
        let newMemo = this.props.memo;
        newMemo.data = event.target.value;
        this.props.saveMemo(newMemo, () => {console.log("moi")});
    }

    render() {
    return (
        <div className="editor">
            <textarea className="editorTextarea" value={this.props.memo.data}
            onChange={this.handleChange}/>
        </div>
    );
    }
}

export default Editor;
