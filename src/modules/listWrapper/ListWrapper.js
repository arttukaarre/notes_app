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

  createAndSaveMemo(memos) {
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
    let memo = { title: "Memo title " + (memos.length + 2), data: "TEKSTIÄ TEKSTIÄ PALJON TEKSTIÄ", active: false, tags: ["tag"+random, "tag"+random2] }
    this.props.saveMemo(memo);
    let newMemos = this.props.memos
  }

  componentWillReceiveProps(newProps) {
    if (newProps.memos !== this.props.memos) {
      this.setState({memos: newProps.memos})
    }
  }

  render() {
    return (
        <div className="listWrapper">
        {
          this.props.memos && this.props.memos.map((elem, index) => {
            return (
              <ListEntry key={index} id={elem.id} name={elem.name} modifyDate={elem.modifyDate}/>
            )
          })
        }
          <button onClick={() => this.createAndSaveMemo(this.props.memos)}>add</button>
          <button onClick={() => this.props.findMemosByTagNames(["tagi2"], (tags) => {console.log("tags", tags)})}>search by tags</button>
          <button onClick={this.clicked3}>print all</button>
        </div>
    );
  }
}

export default ListWrapper;
