/* @flow */

import { Component } from 'react';
import ResizableDecorator from 'react-resizable-decorator';


@ResizableDecorator
class Resizable extends Component {

  render() {
    return this.props.children;
  }
}

export default Resizable;
