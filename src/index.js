import React, {Component, PropTypes} from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import assign from 'react/lib/Object.assign';

export default class ResizableAndMovable extends Component {
  constructor(props) {
    super(props);
    this.state = {isDraggable: true};
    this.isResizing = false;
  }

  onResizeStart(e) {
    this.setState({isDraggable: false});
    this.isResizing = true;
    this.props.onResizeStart();
  }

  onResizeStop(size) {
    this.setState({isDraggable: true});
    this.isResizing = false;
    this.props.onResizeStop(size);
  }

  onDragStart(e, ui) {
    if (this.isResizing) return;
    this.props.onDragStart(e, ui);
  }

  onDrag(e, ui) {
    if (this.isResizing) return;
    this.props.onDrag(e, ui);
  }

  onDragStop(e, ui) {
    if (this.isResizing) return;
    this.props.onDragStop(e, ui);
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
           start,
           zIndex} = this.props;
    return (
      <Draggable
         axis="both"
         zIndex={zIndex}
         start={{x:start.x, y:start.y}}
         disabled={!this.state.isDraggable}
         onStart={this.onDragStart.bind(this)}
         onDrag={this.onDrag.bind(this)}
         onStop={this.onDragStop.bind(this)} >
        <div style={{
               width:`${start.width}px`,
               height:`${start.height}px`,
               cursor: "move",
               position:'absolute'
             }}>
          <Resizable
             onClick={onClick}
             onTouchStart={onTouchStart}
             onResizeStart={this.onResizeStart.bind(this)}
             onResize={this.props.onResize}
             onResizeStop={this.onResizeStop.bind(this)}
             width={start.width}
             height={start.height}
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
  start: {x:0, y:0},
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
