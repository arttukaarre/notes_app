import React, { Component } from 'react';

class ListEntry extends Component {
  render() {
    return (
        <div className="listEntry" onClick={() => this.props.setActiveMemo(this.props.memo)}>
          <p className="listEntryTitle">{this.props.memo.title}</p>
          <p className="listEntryTags">{this.props.memo.tags.join()}</p>
        </div>
    );
  }
}

export default ListEntry;
