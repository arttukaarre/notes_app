import React, { Component } from 'react';

class ListEntry extends Component {
  // opens clicked memo in the editor view
  openMemo(id){
      console.log(id);
  }

  render() {
    return (
        <div className="listEntry" onClick={() => this.openMemo(this.props.id)}>
          <p>{this.props.name}</p>
        </div>
    );
  }
}

export default ListEntry;
