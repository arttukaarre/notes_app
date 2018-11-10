import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete"

class SearchWrapper extends Component {

  render() {

    // Find all tags to be passed to search
    let tags = [];
    for (let i = 0; i < this.props.memos.length; i++) {
      for (let j = 0; j < this.props.memos[i].tags.length; j++) {
        if (tags.indexOf(this.props.memos[i].tags[j]) < 0) {
          tags.push(this.props.memos[i].tags[j])
        }
      }
    }

    return <Autocomplete filterMemosByTagNames={this.props.filterMemosByTagNames} style={{width: "400px"}} suggestions={tags}/>
  }
}

export default SearchWrapper;