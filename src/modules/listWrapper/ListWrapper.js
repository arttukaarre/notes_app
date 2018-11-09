import React, { Component } from 'react';
import ListEntry from '../listEntry/ListEntry';
import '../../App.css'

class ListWrapper extends Component {

  componentDidMount(){

  }

  sort(){

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
        </div>
    );
  }
}

export default ListWrapper;
