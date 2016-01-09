import React, {Component, PropTypes} from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import assign from 'react/lib/Object.assign';

export default class ResizableAndMovable extends Component {
  constructor(props) {
    super(props);
    this.state = {isDraggable: true};
  }

  onResizeStart() {
    this.setState({isDraggable: false});
    this.props.onResizeStart();
  }

  onResizeStop() {
    this.setState({isDraggable: true});
    this.props.onResizeStop();
  }

  render() {
    const {customClass,
           customStyle,
           onClick,
           onTouchStart,
           minWidth,
           minHeight,
           maxWidth,
           maxHeight,
           width,
           height,
           isDragDisabled,
           x,
           y,
           zIndex} = this.props;
    return (
      <Draggable
         axis="both"
         zIndex={zIndex}
         start={{x, y}}
         disabled={!this.state.isDraggable || isDragDisabled}
         onStart={this.props.onDragStart}
         onDrag={this.props.onDrag}
         onStop={this.props.onDragStop} >
        <div style={{width:`${width}px`, height:`${height}px`, cursor: "move", position:'absolute'}}>
          <Resizable
             onClick={onClick}
             onTouchStart={onTouchStart}
             onResizeStart={this.onResizeStart.bind(this)}
             onResize={this.props.onResize}
             onResizeStop={this.onResizeStop.bind(this)}
             width={width}
             height={height}
             minWidth={minWidth}
             minHeight={minHeight}
             maxWidth={maxWidth}
             maxHeight={maxHeight}
             customStyle={customStyle}
             customClass={customClass} >
            {this.props.children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}

ResizableAndMovable.propTypes = {
  onClick: PropTypes.func,
  onTouchStart: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  zIndex: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

ResizableAndMovable.defaultProps = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  zIndex: 100,
  customClass: '',
  isDragDisabled: false,
  onClick: () => {},
  onTouchStartP: () => {},
  onDragStart: () => {},
  onDrag: () => {},
  onDragStop: () => {},
  onResizeStart: () => {},
  onResize: () => {},
  onResizeStop: () => {}
};
