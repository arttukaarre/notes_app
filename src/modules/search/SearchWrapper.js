import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete"

class SearchWrapper extends Component {

  handleChange = (e) => {
    this.props.filterMemosByTagNames(e.currentTarget.value)
  }

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

    return <input className="notes-search-input" type="text" onChange={this.handleChange} placeholder="Search by tag name"/>
  }
}

export default SearchWrapper;