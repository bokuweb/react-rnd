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

export default () => (
  <div
    style={{
      background: '#eee',
      width: '100%',
      height: '100%',
    }}
  >
    <Rnd
      style={style}
      bounds="parent"
      default={{
        width: '30%',
        height: 200,
        x: 100,
        y: 100,
      }}
      maxWidth="100%"
      maxHeight="100%"
    >
      001
    </Rnd>
  </div>
);
