import React, { Component } from 'react';
import ResizableAndMovable from '../../src';

const style = {
  background: '#333',
  textAlign: 'center',
  padding: '20px',
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
        maxWidth={300}
        maxHeight={300}
        onResizeStart={(dir, e) => console.log('resize start')}
        onResize={(dir, size, rect) => console.log(size)}
        onResizeStop={(dir, size, rect) => console.log(`resize stop width=${size.width}, height=${size.height}`)}
        onDragStart={() => console.log('drag start')}
        onDrag={(e, ui) => {
          console.dir(ui);
          console.log(e);
        }}
        onDragStop={() => console.log('drag stop')}
        bounds={'parent'}
      >
       <p>Example</p>
       <p>start 200px x 200px</p>
       <p>min 200px x 200px</p>
       <p>max 300px x 300px</p>
     </ResizableAndMovable>
    );
  }
}
