import React, { Component } from 'react';
import ResizableAndMovable from '../../src';

const style = {
  textAlign: 'center',
  padding: '20px',
  border: 'solid 3px #fff',
  borderRadius: '5px',
  color: '#fff',
};

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 20, y: 20 };
  }
  render() {
    return (
      <ResizableAndMovable
        x={this.state.x}
        y={this.state.y}
        width={200}
        height={200}
        style={style}
        minWidth={200}
        minHeight={200}
        maxWidth={800}
        maxHeight={300}
        bounds={'parent'}
      >
        <p>react-resizable-and-movable Example</p>
        <p>start 200px x 200px</p>
        <p>min 200px x 200px</p>
        <p>max 800px x 300px</p>
     </ResizableAndMovable>
    );
  }
}
