/* @flow */

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';
import type { ResizeDirection, ResizeCallback, ResizeStartCallback } from 're-resizable';

export type Grid = [number, number];

export type Position = {
  x: number,
  y: number,
};

export type DraggableData = {
  node: HTMLElement,
  deltaX: number,
  deltaY: number,
  lastX: number,
  lastY: number,
} & Position;

export type RndDragCallback = (e: Event, data: DraggableData) => void | false;

export type RndResizeStartCallback = (
  e: SyntheticMouseEvent<HTMLDivElement> | SyntheticTouchEvent<HTMLDivElement>,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
) => void;

export type ResizableDelta = {
  width: number,
  height: number,
};

export type RndResizeCallback = (
  e: MouseEvent | TouchEvent,
  dir: ResizeDirection,
  refToElement: React.ElementRef<'div'>,
  delta: ResizableDelta,
  position: Position,
) => void;

type Size = {
  width: string | number,
  height: string | number,
};

type State = {
  z?: number,
  original: Position,
  bounds: {
    top: number,
    right: number,
    bottom: number,
    left: number,
  },
  maxWidth?: number | string,
  maxHeight?: number | string,
  isMounted: boolean,
};

export type ResizeEnable = {
  bottom?: boolean,
  bottomLeft?: boolean,
  bottomRight?: boolean,
  left?: boolean,
  right?: boolean,
  top?: boolean,
  topLeft?: boolean,
  topRight?: boolean,
};

export type HandleClasses = {
  bottom?: string,
  bottomLeft?: string,
  bottomRight?: string,
  left?: string,
  right?: string,
  top?: string,
  topLeft?: string,
  topRight?: string,
};

type Style = {
  [key: string]: string | number,
};

export type HandleStyles = {
  bottom?: Style,
  bottomLeft?: Style,
  bottomRight?: Style,
  left?: Style,
  right?: Style,
  top?: Style,
  topLeft?: Style,
  topRight?: Style,
};

type Props = {
  z?: number,
  dragGrid?: Grid,
  default?: {
    x: number,
    y: number,
  } & Size,
  position?: {
    x: number,
    y: number,
  },
  size?: Size,
  resizeGrid?: Grid,
  bounds?: string,
  onResizeStart?: RndResizeStartCallback,
  onResize?: RndResizeCallback,
  onResizeStop?: RndResizeCallback,
  onDragStart?: RndDragCallback,
  onDrag?: RndDragCallback,
  onDragStop?: RndDragCallback,
  className?: string,
  style?: Style,
  children?: React.Node,
  enableResizing?: ResizeEnable,
  extendsProps?: { [key: string]: any },
  resizeHandleClasses?: HandleClasses,
  resizeHandleStyles?: HandleStyles,
  resizeHandleWrapperClass?: string,
  resizeHandleWrapperStyle?: Style,
  lockAspectRatio?: boolean | number,
  lockAspectRatioExtraWidth?: number,
  lockAspectRatioExtraHeight?: number,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  dragAxis?: 'x' | 'y' | 'both' | 'none',
  dragHandleClassName?: string,
  disableDragging?: boolean,
  cancel?: boolean,
  enableUserSelectHack?: boolean,
  _freeBottomBounds?: boolean, // Back door for react-elastic-grid.
};

const resizableStyle = {
  width: 'auto',
  height: 'auto',
  display: 'inline-block',
  position: 'absolute',
  top: 0,
  left: 0,
};

export default class Rnd extends React.Component<Props, State> {
  static defaultProps = {
    maxWidth: Number.MAX_SAFE_INTEGER,
    maxHeight: Number.MAX_SAFE_INTEGER,
    onResizeStart: () => {},
    onResize: () => {},
    onResizeStop: () => {},
    onDragStart: () => {},
    onDrag: () => {},
    onDragStop: () => {},
  };
  resizable: React$ElementRef<typeof Resizable> | null;
  draggable: Draggable;
  onResizeStart: ResizeStartCallback;
  onResize: ResizeCallback;
  onResizeStop: ResizeCallback;
  onDragStart: RndDragCallback;
  onDrag: RndDragCallback;
  onDragStop: RndDragCallback;
  getMaxSizesFromProps: () => {
    maxWidth: number | string,
    maxHeight: number | string,
  };
  wrapper: HTMLElement;
  parentId: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      z: props.z,
      original: {
        x: 0,
        y: 0,
      },
      bounds: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      isMounted: false,
    };
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.getMaxSizesFromProps = this.getMaxSizesFromProps.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.z !== nextProps.z) {
      this.setState({ z: nextProps.z });
    }
  }

  componentDidMount() {
    this.setParentPosition();
  }

  getParentSize(): { width: number, height: number } {
    return (this.resizable: any).getParentSize();
  }

  getMaxSizesFromProps(): {
    maxWidth: number | string,
    maxHeight: number | string,
    } {
    const maxWidth = typeof this.props.maxWidth === 'undefined' ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
    const maxHeight = typeof this.props.maxHeight === 'undefined' ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
    return { maxWidth, maxHeight };
  }

  getSelfElement(): null | Element | Text {
    if (!this) return null;
    return findDOMNode(this);
  }

  setParentPosition() {
    const element = this.getSelfElement();
    if (element instanceof Element) {
      const parent = element.parentNode;
      if (!parent || typeof window === 'undefined') return;
      if (!(parent instanceof HTMLElement)) return;
      if (getComputedStyle(parent).position !== 'static') {
        this.setState({ isMounted: true });
        return;
      }
      parent.style.position = 'relative';
      this.setState({ isMounted: true });
    }
  }

  onDragStart(e: Event, data: DraggableData) {
    if (this.props.onDragStart) {
      this.props.onDragStart(e, data);
    }
    if (!this.props.bounds) return;
    const parent = this.resizable && this.resizable.parentNode;
    const target = this.props.bounds === 'parent' ? parent : document.querySelector(this.props.bounds);
    if (!(target instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
      return;
    }
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
        bottom: this.props._freeBottomBounds // eslint-disable-line
          ? 2147483647
          : top + (target.offsetHeight - this.resizable.size.height),
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
    refToElement: React.ElementRef<'div'>,
  ) {
    e.stopPropagation();
    this.setState({
      original: { x: this.draggable.state.x, y: this.draggable.state.y },
    });
    if (this.props.bounds) {
      const parent = this.resizable && this.resizable.parentNode;
      const target = this.props.bounds === 'parent' ? parent : document.querySelector(this.props.bounds);
      const self = this.getSelfElement();
      if (self instanceof Element && target instanceof HTMLElement && parent instanceof HTMLElement) {
        let { maxWidth, maxHeight } = this.getMaxSizesFromProps();
        const parentSize = this.getParentSize();
        if (maxWidth && typeof maxWidth === 'string') {
          if (maxWidth.endsWith('%')) {
            const ratio = Number(maxWidth.replace('%', '')) / 100;
            maxWidth = parentSize.width * ratio;
          } else if (maxWidth.endsWith('px')) {
            maxWidth = Number(maxWidth.replace('px', ''));
          }
        }
        if (maxHeight && typeof maxHeight === 'string') {
          if (maxHeight.endsWith('%')) {
            const ratio = Number(maxHeight.replace('%', '')) / 100;
            maxHeight = parentSize.width * ratio;
          } else if (maxHeight.endsWith('px')) {
            maxHeight = Number(maxHeight.replace('px', ''));
          }
        }
        const selfRect = self.getBoundingClientRect();
        const selfLeft = selfRect.left;
        const selfTop = selfRect.top;
        const targetRect = target.getBoundingClientRect();
        const targetLeft = targetRect.left;
        const targetTop = targetRect.top;
        if (/left/i.test(dir) && this.resizable) {
          const max = selfLeft - targetLeft + this.resizable.size.width;
          this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
        }
        if (/right/i.test(dir)) {
          const max = target.offsetWidth + (targetLeft - selfLeft);
          this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
        }
        if (/top/i.test(dir) && this.resizable) {
          const max = selfTop - targetTop + this.resizable.size.height;
          this.setState({
            maxHeight: max > Number(maxHeight) ? maxHeight : max,
          });
        }
        if (/bottom/i.test(dir)) {
          const max = target.offsetHeight + (targetTop - selfTop);
          this.setState({
            maxHeight: max > Number(maxHeight) ? maxHeight : max,
          });
        }
      }
    } else {
      this.setState({
        maxWidth: this.props.maxWidth,
        maxHeight: this.props.maxHeight,
      });
    }
    if (this.props.onResizeStart) {
      this.props.onResizeStart(e, dir, refToElement);
    }
  }

  onResize(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    refToResizableElement: React.ElementRef<'div'>,
    delta: { height: number, width: number },
  ) {
    let x;
    let y;
    if (/left/i.test(direction)) {
      x = this.state.original.x - delta.width;
      this.draggable.setState({ x });
    }
    if (/top/i.test(direction)) {
      y = this.state.original.y - delta.height;
      this.draggable.setState({ y });
    }
    if (this.props.onResize) {
      this.props.onResize(e, direction, refToResizableElement, delta, {
        x: x || this.draggable.state.x,
        y: y || this.draggable.state.y,
      });
    }
  }

  onResizeStop(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    refToResizableElement: HTMLDivElement,
    delta: { height: number, width: number },
  ) {
    const { maxWidth, maxHeight } = this.getMaxSizesFromProps();
    this.setState({ maxWidth, maxHeight });
    if (this.props.onResizeStop) {
      const position: Position = {
        x: this.draggable.state.x,
        y: this.draggable.state.y,
      };
      this.props.onResizeStop(e, direction, refToResizableElement, delta, position);
    }
  }

  updateSize(size: { width: number | string, height: number | string }) {
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
    const cursorStyle =
      this.props.disableDragging || this.props.dragHandleClassName ? { cursor: 'normal' } : { cursor: 'move' };
    const innerStyle = {
      ...resizableStyle,
      zIndex: this.state.z,
      ...cursorStyle,
      ...this.props.style,
    };
    // HACK: Wait for setting relative to parent element.
    if (!this.state.isMounted) return <div />;
    const maxHeight = this.props._freeBottomBounds ? 2147483647 : this.state.maxHeight; // eslint-disable-line
    return (
      <Draggable
        ref={(c: Draggable) => {
          this.draggable = c;
        }}
        handle={this.props.dragHandleClassName}
        defaultPosition={this.props.default}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        axis={this.props.dragAxis}
        disabled={this.props.disableDragging}
        grid={this.props.dragGrid}
        bounds={this.props.bounds ? this.state.bounds : undefined}
        position={this.props.position}
        enableUserSelectHack={this.props.enableUserSelectHack}
        cancel={this.props.cancel}
      >
        <Resizable
          {...this.props.extendsProps}
          className={this.props.className}
          ref={(c: React$ElementRef<typeof Resizable> | null) => {
            this.resizable = c;
          }}
          defaultSize={this.props.default}
          size={this.props.size}
          enable={this.props.enableResizing}
          onResizeStart={this.onResizeStart}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          style={innerStyle}
          minWidth={this.props.minWidth}
          minHeight={this.props.minHeight}
          maxWidth={this.state.maxWidth}
          maxHeight={maxHeight}
          grid={this.props.resizeGrid}
          handleWrapperClass={this.props.resizeHandleWrapperClass}
          handleWrapperStyle={this.props.resizeHandleWrapperStyle}
          lockAspectRatio={this.props.lockAspectRatio}
          lockAspectRatioExtraWidth={this.props.lockAspectRatioExtraWidth}
          lockAspectRatioExtraHeight={this.props.lockAspectRatioExtraHeight}
          handleStyles={this.props.resizeHandleStyles}
          handleClasses={this.props.resizeHandleClasses}
        >
          {this.props.children}
        </Resizable>
      </Draggable>
    );
  }
}
