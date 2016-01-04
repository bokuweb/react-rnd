import React, {Component} from 'react';
import Label from '../../src';

export default class Example extends Component{
  constructor() {
    super();
  }

  render() {
    return (
      <Label
         x={0}
         y={0} >
        <textarea style={{
                    width: '100%',
                    height: '100%',
                    resize: 'none',
                    cursor: 'move'
                  }}/>
      </Label>
    );
  }
}
