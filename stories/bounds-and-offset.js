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

const handleClick = () => {
  console.log('click work.')
}

const handleDragStart = (e, data) => {
  console.log(data.x, data.y)
}

const handleDrag = (e, data) => {
  console.log(data.x, data.y)
}

const handleDragStop = (e, data) => {
  console.log(data.x, data.y)
}

const handleResizeStart = (_, __, ele) => {
  console.log(ele.clientWidth, ele.clientHeight)
}

const handleResize = (_, __, ele, ___, pos) => {
  console.log(ele.clientWidth, ele.clientHeight, pos.x, pos.y)
}

const handleResizeStop = (_, __, ele, ___, pos) => {
  console.log(ele.clientWidth, ele.clientHeight, pos.x, pos.y)
}

export default () => (
  <div style={{ width: '100%', height:'100%' }}>
    <div className="bounds" style={{ border: '1px solid red', width: '500px', height: '500px', position: 'absolute' }}>
      <div className="offsetParent" style={{ border: '1px dotted green', width: '200px', height: '200px', position: 'absolute', left: '150px', top: '150px' }}>
        <Rnd
          extendsProps={{ onClick: handleClick }}
          style={{ background: '#ddd' }}
          default={{ x: -50, y: 0, width: 100, height: 100 }}
          bounds=".bounds"
          onResizeStart={handleResizeStart}
          onResize={handleResize}
          onResizeStop={handleResizeStop}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragStop={handleDragStop}
        >
          Hello from React
        </Rnd>
      </div>
    </div>
  </div>
);
