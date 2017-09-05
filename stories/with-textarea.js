/* eslint-disable */

import React from 'react';
import Resizable from '../src';

const style = {
  border: 'solid 1px #ddd',
  background: '#f0f0f0',
  padding: '30px',
};

export default () => (
  <Resizable
    style={style}
    width={200}
    height={200}
  >
    <textarea style={{ width: '100%', height: '60%' }} />
  </Resizable>
);
