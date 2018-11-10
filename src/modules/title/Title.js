import React, { Component } from 'react';

class Title extends Component {
    handleChange = (event) => {
        let newMemo = this.props.memo;
        newMemo.title = event.target.value;
        this.props.saveMemo(newMemo, () => {console.log("moi")});
    }

    render() {
        return (
            <div className="titleContainer">
            <textarea className="titleTextarea"
            value={this.props.memo.title}
            onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Title;
