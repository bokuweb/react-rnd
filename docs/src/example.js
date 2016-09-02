import React, { Component } from 'react';
import Rnd from '../../src';

const style = {
  textAlign: 'center',
  padding: '40px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default class Example extends Component {
  render() {
    return (
      <Rnd
        ref={c => { this.rnd = c; }}
        initial={{
          x: window.innerWidth / 2 - 200,
          y: window.innerHeight / 2 - 80,
          width: 400,
          height: 160,
        }}
        style={style}
        minWidth={300}
        minHeight={160}
        maxWidth={800}
        maxHeight={300}
        bounds={'parent'}
      >
        <span className="box">
          resize and drag me!!
        </span>
      </Rnd>
    );
  }
}
