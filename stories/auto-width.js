/* eslint-disable */

import React from 'react';
import Resizable from '../src';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
};

export default () => (
  <Resizable
    style={style}
    width="auto"
    height={200}
  >
    001
  </Resizable>
);
