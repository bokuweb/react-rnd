/* eslint-disable */

import React from 'react';
import Rnd from '../src';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      width: 100,
      height: 120,
      x: 0,
      y: 0,
    };
  }

  render() {
    return (
      <Rnd
        style={style}
        size={{
          width: this.state.width,
          height: this.state.height,
        }}
        bounds="parent"
        position={{
          x: this.state.x,
          y: this.state.y,
        }}
        onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          });
        }}
      >
        001
       </Rnd>
    );
  }
}
