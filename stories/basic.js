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
  <Rnd
    style={style}
    default={{
      width: 200,
      height: 200,
      x: 100,
      y: 100,
    }}
  >
    001
  </Rnd>
);
