import React, {Component} from 'react';
import ResizableAndMovable from '../../src';

export default class Example extends Component{

  constructor(props) {
    super(props);
    this.state = { x: 20, y: 20 };
    //setInterval(() => {
    //  this.setState({x: this.state.x+1})
    //}, 10);
  }
  render() {
    return (
      <ResizableAndMovable
         x={20}
         y={20}
         width={200}
         height={200}
         style={{background:"#333", textAlign:"center", paddingTop: '20px'}}
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
        bounds={'parent'}
        x={this.state.x}
        onDragStop={() => console.log('drag stop')} >
        <p>Example</p>
        <p>start 200px x 200px</p>
        <p>min 200px x 200px</p>
        <p>max 300px x 300px</p>
      </ResizableAndMovable>
    );
  }
}
