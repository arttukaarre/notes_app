import React, { Component } from 'react';
import TokenInput from 'react-customize-token-input';

class TagContainer extends Component {
    componentDidMount(){
        console.log(this.props.tags)
    }

    render() {
        return (
            <div className="tagContainer">
                <TokenInput placeholder="Add a tag" defaultData={this.props.memo.tags}/>
            </div>
        );
    }
}

export default TagContainer;
