import React, { Component } from 'react';

class ListEntry extends Component {
  // opens clicked memo in the editor view
  openMemo(id){
      console.log(id);
      
  }

  render() {
    return (
        <div className="listEntry" onClick={() => this.props.setActiveMemo(this.props.memo)}>
          <p>{this.props.memo.title}</p>
        </div>
    );
  }
}

export default ListEntry;
