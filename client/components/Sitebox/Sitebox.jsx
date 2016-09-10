import React, { Component } from 'react';

class Sitebox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      label: props.name.split('.')[0]
    };
  }

  render() {
    var divStyle = {
      backgroundColor: this.props.colour || '#555',
    };

    return (
      <div className="box-container" style={divStyle}>
        <div className="sitebox">
          <span>{ this.state.label }</span>
        </div>
      </div>
    );
  }
}

export default Sitebox;
