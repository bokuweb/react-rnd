import React, {Component} from 'react';
import ResizableAndMovable from '../../src';

export default class Example extends Component{

  render() {
    return (
      <ResizableAndMovable
         start={{x:20, y: 20, width: 200, height: 200}}
         customStyle={{background:"#333", textAlign:"center", paddingTop: '20px'}}
         minWidth={200}
         minHeight={200}
         maxWidth={300}
         maxHeight={300}
         onResizeStart={() => console.log('resize start')}
         onResize={size => console.log(size)}
         onResizeStop={size => console.log(`resize stop width=${size.width}, height=${size.height}`)}
         onDragStart={() => console.log('drag start')}
         onDrag={(e, ui) => {
           console.dir(ui);
           console.log(e);
         }}
         onDragStop={() => console.log('drag stop')} >
        <p>Example</p>
        <p>start 200px x 200px</p>
        <p>min 200px x 200px</p>
        <p>max 300px x 300px</p>
      </ResizableAndMovable>
    );
  }
}
