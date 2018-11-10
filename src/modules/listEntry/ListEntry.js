import React, { Component } from 'react';

class ListEntry extends Component {
  render() {
    return (
        <div className="listEntry" onClick={() => this.props.setActiveMemo(this.props.memo)}>
          <p>{this.props.memo.title}</p>
        </div>
    );
  }
}

export default ListEntry;
