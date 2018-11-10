import React, { Component } from 'react';

class TagContainer extends Component {
    handleChange = (event) => {
        let newMemo = this.props.memo;
        newMemo.tags = event.target.value.split(",");
        this.props.saveMemo(newMemo, () => {console.log("moi")});
    }

    render() {
        return (
            <div className="tagContainer">
                <textarea className="tagTextarea" placeholder="enter tags friend"
                value={this.props.memo.tags}
                onChange={this.handleChange}/>
            </div>
        );
    }
}

export default TagContainer;
