/* @flow */

import * as React from 'react';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';
import type { ResizeDirection, ResizeCallback, ResizeStartCallback } from 're-resizable';

export type Grid = [number, number];

type Position = {
  x: number;
  y: number;
}

export type DraggableData = {
  node: HTMLElement;
  deltaX: number, deltaY: number;
  lastX: number, lastY: number;
} & Position;

export type RndDragCallback = (
  e: Event, data: DraggableData,
) => void | false;

export type RndResizeStartCallback = (
  e: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
) => void;

export type ResizableDelta = {
  width: number, height: number,
}

export type RndResizeCallback = (
  e: MouseEvent | TouchEvent,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
  delta: ResizableDelta,
  position: Position,
) => void;

type State = {
  disableDragging: boolean;
  z?: number;
  original: Position;
  bounds: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  maxWidth?: number;
  maxHeight?: number;
}

export type ResizeEnable = {
  bottom?: boolean,
  bottomLeft?: boolean,
  bottomRight?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean,
  topLeft?: boolean,
  topRight?: boolean
}

export type HandleClasses = {
  bottom?: string,
  bottomLeft?: string,
  bottomRight?: string,
  left?: string,
  right?: string,
  top?: string,
  topLeft?: string,
  topRight?: string
}

type Style = {
  [key: string]: string;
}

export type HandleStyles = {
  bottom?: Style,
  bottomLeft?: Style,
  bottomRight?: Style,
  left?: Style,
  right?: Style,
  top?: Style,
  topLeft?: Style,
  topRight?: Style
}

type Props = {
  z?: number;
  dragGrid?: Grid;
  default: {
    width: number | string;
    height: number | string;
  } & Position;
  resizeGrid?: Grid;
  bounds?: string;
  onResizeStart?: RndResizeStartCallback;
  onResize?: RndResizeCallback;
  onResizeStop?: RndResizeCallback;
  onDragStart?: RndDragCallback;
  onDrag?: RndDragCallback;
  onDragStop?: RndDragCallback;
  className?: string;
  style?: Style;
  children?: React.Node;
  enableResizing?: ResizeEnable;
  extendsProps?: any;
  resizeHandlerClasses?: HandleClasses;
  resizeHandlerStyles?: HandleStyles;
  lockAspectRatio?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
  dragAxis?: 'x' | 'y' | 'both' | 'none';
  dragHandlerClassName?: string;
  disableDragging?: boolean;
}

const boxStyle = {
  width: 'auto',
  height: 'auto',
  cursor: 'move',
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  left: 0,
};

export default class Rnd extends React.Component<Props, State> {
  static defaultProps = {
    maxWidth: Number.MAX_SAFE_INTEGER,
    maxHeight: Number.MAX_SAFE_INTEGER,
    onResizeStart: () => { },
    onResize: () => { },
    onResizeStop: () => { },
    onDragStart: () => { },
    onDrag: () => { },
    onDragStop: () => { },
  };
  resizable: (React$ElementRef<typeof Resizable> | null);
  draggable: Draggable;
  onResizeStart: ResizeStartCallback;
  onResize: ResizeCallback;
  onResizeStop: ResizeCallback;
  onDragStart: RndDragCallback;
  onDrag: RndDragCallback;
  onDragStop: RndDragCallback;
  wrapper: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      disableDragging: false,
      z: props.z,
      original: {
        x: props.default.x || 0,
        y: props.default.y || 0,
      },
      bounds: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
    };
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.z === nextProps.z) return;
    this.setState({
      z: nextProps.z,
    });
  }

  componentDidMount() {
    this.setParentPosition();
  }

  componentWillUpdate() {
    this.setParentPosition();
  }

  setParentPosition() {
    const parent = this.wrapper.parentNode;
    if (!parent || typeof window === 'undefined') return;
    if (!(parent instanceof HTMLElement)) return;
    if (getComputedStyle(parent).position !== 'static') return;
    parent.style.position = 'relative';
  }

  onDragStart(e: Event, data: DraggableData) {
    if (this.props.onDragStart) {
      this.props.onDragStart(e, data);
    }
    if (!this.props.bounds) return;
    const parent = this.wrapper && this.wrapper.parentNode;
    const target = this.props.bounds === 'parent'
      ? parent
      : document.querySelector(this.props.bounds);
    if (!(target instanceof HTMLElement) || !(parent instanceof HTMLElement)) return;
    const targetRect = target.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const parentRect = parent.getBoundingClientRect();
    const parentLeft = parentRect.left;
    const parentTop = parentRect.top;
    const left = targetLeft - parentLeft;
    const top = targetTop - parentTop;
    if (!this.resizable) return;
    this.setState({
      bounds: {
        top,
        right: left + (target.offsetWidth - this.resizable.size.width),
        bottom: top + (target.offsetHeight - this.resizable.size.height),
        left,
      },
    });
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
    e: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
    dir: ResizeDirection,
    refToElement: HTMLElement, // React.ElementRef<'div'>,
  ) {
    e.stopPropagation();
    this.setState({
      disableDragging: true,
      original: { x: this.draggable.state.x, y: this.draggable.state.y },
    });
    if (this.props.bounds) {
      const parent = this.wrapper && this.wrapper.parentNode;
      const target = this.props.bounds === 'parent'
        ? parent
        : document.querySelector(this.props.bounds);
      const self = this.wrapper;
      if (target instanceof HTMLElement && parent instanceof HTMLElement) {
        const maxWidth = typeof this.props.maxWidth === 'undefined' ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
        const maxHeight = typeof this.props.maxHeight === 'undefined' ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
        const selfRect = self.getBoundingClientRect();
        const selfLeft = selfRect.left;
        const selfTop = selfRect.top;
        const targetRect = target.getBoundingClientRect();
        const targetLeft = targetRect.left;
        const targetTop = targetRect.top;
        if (/left/i.test(dir) && this.resizable) {
          const max = (selfLeft - targetLeft) + this.resizable.size.width;
          this.setState({ maxWidth: max > maxWidth ? maxWidth : max });
        }
        if (/right/i.test(dir)) {
          const max = target.offsetWidth + (targetLeft - selfLeft);
          this.setState({ maxWidth: max > maxWidth ? maxWidth : max });
        }
        if (/top/i.test(dir) && this.resizable) {
          const max = (selfTop - targetTop) + this.resizable.size.height;
          this.setState({ maxHeight: max > maxHeight ? maxHeight : max });
        }
        if (/bottom/i.test(dir)) {
          const max = target.offsetHeight + (targetTop - selfTop);
          this.setState({ maxHeight: max > maxHeight ? maxHeight : max });
        }
      }
    } else {
      this.setState({ maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight });
    }
    if (this.props.onResizeStart) {
      this.props.onResizeStart(e, dir, refToElement);
    }
  }

  onResize(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    refToResizableElement: HTMLDivElement,
    delta: { height: number, width: number },
  ) {
    let parentLeft = 0;
    let selfLeft = 0;
    let parentTop = 0;
    let selfTop = 0;
    if (this.props.bounds) {
      const parent = this.wrapper && this.wrapper.parentNode;
      const target = this.props.bounds === 'parent'
        ? parent
        : document.querySelector(this.props.bounds);
      const self = this.wrapper;
      if (target instanceof HTMLElement && parent instanceof HTMLElement) {
        const selfRect = self.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        selfLeft = selfRect.left;
        selfTop = selfRect.top;
        parentLeft = parentRect.left;
        parentTop = parentRect.top;
      }
    }
    if (/left/i.test(direction)) {
      const x = selfLeft >= parentLeft
        ? (this.state.original.x - delta.width)
        : (parentLeft - selfLeft);
      this.draggable.setState({ x });
    }
    if (/top/i.test(direction)) {
      const y = selfTop >= parentTop
        ? (this.state.original.y - delta.height)
        : (parentTop - selfTop);
      this.draggable.setState({ y });
    }
    if (this.props.onResize) {
      this.props.onResize(e, direction, refToResizableElement, delta, {
        x: this.draggable.state.x,
        y: this.draggable.state.y,
      });
    }
  }

  onResizeStop(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    refToResizableElement: HTMLDivElement,
    delta: { height: number, width: number },
  ) {
    this.setState({ disableDragging: false });
    if (this.props.onResizeStop) {
      const position: Position = {
        x: this.draggable.state.x,
        y: this.draggable.state.y,
      };
      this.props.onResizeStop(e, direction, refToResizableElement, delta, position);
    }
  }

  updateSize(size: { width: number, height: number }) {
    if (!this.resizable) return;
    this.resizable.updateSize({ width: size.width, height: size.height });
  }

  updatePosition(position: Position) {
    this.draggable.setState(position);
  }

  updateZIndex(z: number) {
    this.setState({ z });
  }

  render(): React.Node {
    const cursorStyle = this.props.disableDragging ? { cursor: 'normal' } : {};
    const innerStyle = {
      ...boxStyle,
      zIndex: this.state.z,
      ...cursorStyle,
    };

    return (
      <Draggable
        ref={(c: Draggable) => { this.draggable = c; }}
        handle={this.props.dragHandlerClassName}
        defaultPosition={{ x: this.props.default.x, y: this.props.default.y }}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        axis={this.props.dragAxis}
        disabled={this.props.disableDragging}
        grid={this.props.dragGrid}
        bounds={this.props.bounds ? this.state.bounds : undefined}
      >
        <div
          className={this.props.className}
          style={innerStyle}
          ref={(c: HTMLElement) => { this.wrapper = c; }}
          {...this.props.extendsProps}
        >
          <Resizable
            ref={(c: (React$ElementRef<typeof Resizable> | null)) => { this.resizable = c; }}
            enable={this.props.enableResizing}
            onResizeStart={this.onResizeStart}
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}
            style={this.props.style}
            width={this.props.default.width}
            height={this.props.default.height}
            minWidth={this.props.minWidth}
            minHeight={this.props.minHeight}
            maxWidth={this.state.maxWidth}
            maxHeight={this.state.maxHeight}
            grid={this.props.resizeGrid}
            lockAspectRatio={this.props.lockAspectRatio}
            handlerStyles={this.props.resizeHandlerStyles}
            handlerClasses={this.props.resizeHandlerClasses}
          >
            {this.props.children}
          </Resizable>
        </div>
      </Draggable >
    );
  }
}
