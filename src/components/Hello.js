/* @flow */

import React, { Component, cloneElement } from 'react';
import Draggable from 'react-draggable';
import Resizable from './resizable';

type State = {
  disableDragging: boolean;
}

export default class Rnd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disableDragging: false,
    };
  }

  //state: State;
  //draggable: React$Element<Draggable>;

  renderResizable() {
    return (
      <Resizable
        onResizeStart={(e) => { e.stopPropagation(); }}
      >
        {this.props.children}
      </Resizable>
    );
  }

  render() {
    return (
      <Draggable
        ref={(c: React$Element<Draggable>) => { this.draggable = c; }}
        disabled={this.state.disableDragging}
      >
        {cloneElement(
          this.props.children,
          {},
          this.renderResizable())}
      </Draggable>
    );
  }
}
