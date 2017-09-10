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

let i = 100;

export default class SandBox extends React.Component {

  constructor(p) {
    super(p);
    this.state = {
      x: 100,
    }
  }

  componentDidMount() {
    setInterval(() => {
      i += 100;
      this.setState({
        x: i,
      })
    }, 1000);
  }

  render() {
    return <Rnd
      style={style}
      width={200}
      height={200}
      x={this.state.x}
      y={100}

    >
      001
    </Rnd>
  }
}
