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
      padding: '20px',
      width: '100%',
      height: '100%',
    }}
  >
    {[...Array(3).keys()].map((_, i) => {
      return <Rnd
        style={style}
        bounds="parent"
        default={{
          width: 200,
          height: 200,
          x: 100 * i,
          y: 100 * i,
        }}
      >
        00{i}
      </Rnd>
    })}
  </div>
);
