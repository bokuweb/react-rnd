import React, { Component, PropTypes } from 'react';
import Draggable from '@bokuweb/react-draggable-custom';
import Resizable from 'react-resizable-box';

export default class ResizableAndMovable extends Component {
  static propTypes = {
    initAsResizing: PropTypes.object,
    onResizeStart: PropTypes.func,
    onResize: PropTypes.func,
    onResizeStop: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragStop: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    onTouchStart: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    dragHandlerClassName: PropTypes.string,
    resizerhandleStyle: PropTypes.shape({
      top: PropTypes.object,
      right: PropTypes.object,
      bottom: PropTypes.object,
      left: PropTypes.object,
      topRight: PropTypes.object,
      bottomRight: PropTypes.object,
      bottomLeft: PropTypes.object,
      topLeft: PropTypes.object,
    }),
    isResizable: PropTypes.shape({
      top: PropTypes.bool,
      right: PropTypes.bool,
      bottom: PropTypes.bool,
      left: PropTypes.bool,
      topRight: PropTypes.bool,
      bottomRight: PropTypes.bool,
      bottomLeft: PropTypes.bool,
      topLeft: PropTypes.bool,
    }),
    customClass: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    moveAxis: PropTypes.oneOf(['x', 'y', 'both', 'none']),
    grid: PropTypes.arrayOf(PropTypes.number),
    bounds: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    x: PropTypes.number,
    y: PropTypes.number,
    zIndex: PropTypes.number,
  };

  static defaultProps = {
    width: 100,
    height: 100,
    start: { x: 0, y: 0 },
    zIndex: 100,
    customClass: '',
    initAsResizing: { enable: false, direction: 'bottomRight' },
    isResizable: { x: true, y: true, xy: true },
    moveAxis: 'both',
    grid: null,
    onClick: () => {},
    onTouchStart: () => {},
    onDragStart: () => {},
    onDrag: () => {},
    onDragStop: () => {},
    onResizeStart: () => {},
    onResize: () => {},
    onResizeStop: () => {},
  }

  constructor(props) {
    super(props);
    this.state = { isDraggable: true, x: props.x, y: props.y };
    this.isResizing = false;
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
  }

  componentDidMount() {
    const { initAsResizing: { enable, direction, event } } = this.props;
    if (enable) this.refs.resizable.onResizeStart(direction, event);
  }

  onResizeStart(dir, e) {
    this.setState({ isDraggable: false });
    this.isResizing = true;
    this.props.onResizeStart(dir, e);
    e.stopPropagation();
  }

  onResizeStop(dir, styleSize, clientSize) {
    this.setState({ isDraggable: true });
    this.isResizing = false;
    this.props.onResizeStop(dir, styleSize, clientSize);
  }

  onDragStart(e, ui) {
    if (this.isResizing) return;
    this.props.onDragStart(e, ui);
  }

  onDrag(e, ui) {
    if (this.isResizing) return;
    this.setState({ x: ui.position.left, y: ui.position.top });
    this.props.onDrag(e, ui);
  }

  onDragStop(e, ui) {
    if (this.isResizing) return;
    this.props.onDragStop(e, ui);
  }

  render() {
    const { className, style, onClick, onTouchStart,
            width, height, minWidth, minHeight, maxWidth, maxHeight,
            zIndex, bounds, moveAxis, dragHandlerClassName,
            grid, onDoubleClick } = this.props;
    const { x, y } = this.state;
    return (
      <Draggable
        axis={moveAxis}
        zIndex={zIndex}
        start={{ x, y }}
        disabled={!this.state.isDraggable || this.props.moveAxis === 'none'}
        onStart={this.onDragStart}
        handle={dragHandlerClassName}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        bounds={bounds}
        grid={grid}
        passCoordinate
        x={x}
        y={y}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            cursor: 'move',
            position: 'absolute',
            zIndex: `${zIndex}`,
          }}
        >
          <Resizable
            ref="resizable"
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onTouchStart={onTouchStart}
            onResizeStart={this.onResizeStart}
            onResize={this.props.onResize}
            onResizeStop={this.onResizeStop}
            width={width}
            height={height}
            minWidth={minWidth}
            minHeight={minHeight}
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            customStyle={style}
            customClass={className}
            isResizable={this.props.isResizable}
          >
            {this.props.children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}
