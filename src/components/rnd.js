/* @flow */

import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Resizable from 'react-resizable-box';
import type { Direction, ResizeHandler, ResizeStartHandler } from 'react-resizable-box';

export type Grid = [number, number];

export type DraggableData = {
  node: HTMLElement,
  x: number,
  y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

export type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;

type State = {
  disableDragging: boolean;
  z?: number;
  original: {
    x: number;
    y: number;
  }
}

type Props = {
  z?: number;
  dragGrid?: Grid;
  default: {
    x: number;
    y: number;
    width: number | string;
    height: number | string;
  };
  resizeGrid?: Grid;
  bounds?: 'window' | 'parent';
  onResizeStart?: ResizeStartHandler;
  onResize?: ResizeHandler;
  onResizeStop?: ResizeHandler;
  onDragStart?: DraggableEventHandler;
  onDrag?: DraggableEventHandler;
  onDragStop?: DraggableEventHandler;
}

export type Position = {
  x: number;
  y: number;
}

const boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  // position: 'absolute',
};

export default class Rnd extends Component {

  state: State;
  resizable: Resizable;
  state: State;
  draggable: Draggable;
  onResizeStart: ResizeStartHandler;
  onResize: ResizeHandler;
  onResizeStop: ResizeHandler;
  onDragStart: DraggableEventHandler;
  onDrag: DraggableEventHandler;
  onDragStop: DraggableEventHandler;

  constructor(props: Props) {
    super(props);
    this.state = {
      disableDragging: false,
      z: props.z,
      original: {
        x: props.default.x || 0,
        y: props.default.y || 0,
      },
    };
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  onDragStart(e: Event, data: DraggableData) {
    if (this.props.onDragStart) {
      this.props.onDragStart(e, data);
    }
  }

  onDrag(e: Event, data: DraggableData) {
    if (this.props.onDrag) {
      this.props.onDrag(e, data);
    }
  }

  onDragStop(e: Event, data: DraggableData) {
    if (this.props.onDragStop) {
      this.props.onDragStop(e, data);
    }
  }

  onResizeStart(
    e: SyntheticMouseEvent | SyntheticTouchEvent,
    dir: Direction,
    refToResizableElement: HTMLElement,
  ) {
    this.setState({
      disableDragging: true,
      original: { x: this.draggable.state.x, y: this.draggable.state.y },
    });
    if (this.props.onResizeStart) {
      this.props.onResizeStart(e, dir, refToResizableElement);
    }
    e.stopPropagation();
  }

  onResize(
    e: MouseEvent | TouchEvent,
    direction: Direction,
    refToResizableElement: HTMLElement,
    delta: { height: number, width: number },
  ) {
    if (/left/i.test(direction)) {
      this.draggable.setState({ x: this.state.original.x - delta.width });
    }
    if (/top/i.test(direction)) {
      this.draggable.setState({ y: this.state.original.y - delta.height });
    }
    if (this.props.onResize) {
      this.props.onResize(event, direction, refToResizableElement, delta, {
        x: this.draggable.state.x,
        y: this.draggable.state.y,
      });
    }
  }

  onResizeStop(
    e: MouseEvent | TouchEvent,
    direction: Direction,
    refToResizableElement: HTMLElement,
    delta: { height: number, width: number },
  ) {
    this.setState({ disableDragging: false });
    if (this.props.onResizeStop) {
      this.props.onResizeStop(event, direction, refToResizableElement, delta, {
        x: this.draggable.state.x,
        y: this.draggable.state.y,
      });
    }
  }

  updateSize(size: { x: string | number, y: string | number }) {
    this.resizable.updateSize(size);
  }

  updatePosition(position: Position) {
    this.draggable.setState(position);
  }

  updateZIndex(z: number) {
    this.setState({ z });
  }

  render() {
    return (
      <Draggable
        ref={(c: Draggable) => { this.draggable = c; }}
        handle={this.props.dragHandlerClassName}
        defaultPosition={{ x: this.props.default.x, y: this.props.default.y }}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        axis={this.props.dragAxis}
        zIndex={this.state.z}
        grid={this.props.dragGrid}
        bounds={this.props.bounds}
      >
        <div style={boxStyle}>
          <Resizable
            ref={(c: Resizable) => { this.resizable = c; }}
            className={this.props.resizeClassName}
            style={this.props.style}
            enable={this.props.enableResize}
            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}
            width={this.props.default.width}
            height={this.props.default.height}
            minWidth={this.props.minWidth}
            minHeight={this.props.minHeight}
            maxWidth={this.props.maxWidth}
            maxHeight={this.props.maxHeight}
            grid={this.props.resizeGrid}
            bounds={this.props.bounds}
            lockAspectRatio={this.props.lockAspectRatio}
            handlerStyles={this.props.resizeHandlerStyles}
            handlerClasses={this.props.resizeHandlerClasses}
          >
            {this.props.children}
          </Resizable>
        </div>
      </Draggable>
    );
  }
}
