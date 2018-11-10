import React, { Component } from 'react';
import ListEntry from '../listEntry/ListEntry';
import '../../App.css'
import SearchWrapper from "../search/SearchWrapper";

class ListWrapper extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }

  render() {
    if (this.props.memos && this.props.memos.length > 0) {
      this.props.memos.sort(function (a, b) {
        return a.title > b.title;
      })
    }

    // Create a memo with 2 random tags from "tag1...tag4"
    let random = Math.floor(Math.random() * 4) + 1;
    let random2 = Math.floor(Math.random() * 4) + 1;
    let go = false
    while (!go) {
      if (random === random2) {
        random2 = Math.floor(Math.random() * 4) + 1;
      } else {
        go = true;
      }
    }
    let memo = { title: "Memo title " + (this.props.memos.length + 1), data: "TEKSTIÄ TEKSTIÄ PALJON TEKSTIÄ", active: false, tags: ["tag"+random, "tag"+random2] }

    return (
        <div className="listWrapper">
          <button onClick={() => this.props.createMemo(memo, () => {})}>add</button>
          <button onClick={() => this.props.findMemosByTagNames(["tag2"], (memos) => {console.log("Found memos by tags: ", memos)})}>search by tags</button>
          <button onClick={() => this.props.findAllMemos((memos) => { console.log(memos) })}>print all</button>
          <button onClick={this.props.removeAllMemos}>remove all</button>
          <SearchWrapper
              filterMemosByTagNames={this.props.filterMemosByTagNames}
              memos={this.props.memos}
              className="notes-search"/>
        {
          this.props.memos && this.props.memos.map((elem, index) => {
            return (
              <ListEntry memo={elem} setActiveMemo={this.props.setActiveMemo} key={index}/>
            )
          })
        }
        </div>
    );
  }
}

export default ListWrapper;
