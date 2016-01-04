import React, {Component} from 'react';
import ResizableAndMovable from '../../src';

export default class Example extends Component{
  constructor() {
    super();
  }

  render() {
    return (
      <ResizableAndMovable
         customStyle={{background:"#333", textAlign:"center"}}
         minWidth={100}
         minHeight={100}
         maxWidth={300}
         maxHeight={300}
         onResizeStart={()=> console.log('resize start')}>
          Example
      </ResizableAndMovable>
    );
  }
}
