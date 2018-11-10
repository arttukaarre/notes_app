import React, { Component } from 'react';
import ListEntry from '../listEntry/ListEntry';
import '../../App.css'

class ListWrapper extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }

  sort(){

  }

  render() {

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
          <button onClick={() => this.props.saveMemo(memo)}>add</button>
          <button onClick={() => this.props.findMemosByTagNames(["tag2"], (memos) => {console.log("Found memos by tags: ", memos)})}>search by tags</button>
          <button onClick={() => this.props.findAllMemos((memos) => { console.log(memos) })}>print all</button>
          <button onClick={this.props.removeAllMemos}>remove all</button>
        {
          this.props.memos && this.props.memos.map((elem, index) => {
            return (
              <ListEntry key={index} id={elem.id} name={elem.title} modifyDate={elem.modifyDate}/>
            )
          })
        }
        </div>
    );
  }
}

export default ListWrapper;
