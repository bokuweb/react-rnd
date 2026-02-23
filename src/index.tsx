import * as React from "react";
import Draggable, { DraggableEventHandler, DraggableProps } from "react-draggable";
import { Enable, Resizable, ResizeDirection } from "re-resizable";
import { flushSync } from "react-dom";

export type Grid = [number, number];

export type Position = {
  x: number;
  y: number;
};

export type DraggableData = {
  node: HTMLElement;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
} & Position;

export type RndDragCallback = DraggableEventHandler;

export type RndDragEvent =
  | React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent;

export type RndResizeStartCallback = (
  e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  dir: ResizeDirection,
  elementRef: HTMLElement,
) => void | boolean;

export type ResizableDelta = {
  width: number;
  height: number;
};

export type RndResizeCallback = (
  e: MouseEvent | TouchEvent,
  dir: ResizeDirection,
  elementRef: HTMLElement,
  delta: ResizableDelta,
  position: Position | GridPosition,
  gridPlacement?: GridPlacement,
) => void;

type Size = {
  width: string | number;
  height: string | number;
};

export type PositionUnit = "px" | "%" | "grid";

export type SizeUnit = "px" | "%" | "grid";

/** Grid layout: columns count and row height in px. Column width = containerWidth / columns. */
export type GridConfig = {
  columns: number;
  rowHeight: number;
};

/** Grid placement in 0-based line indices (columnEnd/rowEnd exclusive). */
export type GridPlacement = {
  columnStart: number;
  rowStart: number;
  columnEnd: number;
  rowEnd: number;
};

/** Grid position (start cell). */
export type GridPosition = {
  columnStart: number;
  rowStart: number;
};

/** Grid size in spans. */
export type GridSize = {
  columnSpan: number;
  rowSpan: number;
};

type State = {
  resizing: boolean;
  bounds: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  maxWidth?: number | string;
  maxHeight?: number | string;
  parentSize: { width: number; height: number } | null;
};

type MaxSize = {
  maxWidth: number | string;
  maxHeight: number | string;
};

export type ResizeEnable =
  | {
      bottom?: boolean;
      bottomLeft?: boolean;
      bottomRight?: boolean;
      left?: boolean;
      right?: boolean;
      top?: boolean;
      topLeft?: boolean;
      topRight?: boolean;
    }
  | boolean;

export type HandleClasses = {
  bottom?: string;
  bottomLeft?: string;
  bottomRight?: string;
  left?: string;
  right?: string;
  top?: string;
  topLeft?: string;
  topRight?: string;
};

export type HandleStyles = {
  bottom?: React.CSSProperties;
  bottomLeft?: React.CSSProperties;
  bottomRight?: React.CSSProperties;
  left?: React.CSSProperties;
  right?: React.CSSProperties;
  top?: React.CSSProperties;
  topLeft?: React.CSSProperties;
  topRight?: React.CSSProperties;
};

export type HandleComponent = {
  top?: React.ReactElement<any>;
  right?: React.ReactElement<any>;
  bottom?: React.ReactElement<any>;
  left?: React.ReactElement<any>;
  topRight?: React.ReactElement<any>;
  bottomRight?: React.ReactElement<any>;
  bottomLeft?: React.ReactElement<any>;
  topLeft?: React.ReactElement<any>;
};

/** Default / position / size when positionUnit or sizeUnit is "grid" use grid fields. */
export type RndDefaultGrid = GridPosition & GridSize;

export interface Props {
  dragGrid?: Grid;
  /** Required when positionUnit or sizeUnit is "grid". */
  gridConfig?: GridConfig;
  default?: (
    | ({ x: number; y: number } & Size)
    | RndDefaultGrid
  );
  position?: Position | GridPosition;
  size?: Size | GridSize;
  resizeGrid?: Grid;
  /** When 'grid', position is GridPosition and gridConfig is required; callbacks receive grid placement. */
  positionUnit?: PositionUnit;
  /** When 'grid', size is GridSize and gridConfig is required; callbacks receive grid placement. Default 'px'. */
  sizeUnit?: SizeUnit;
  /** When 'grid', the wrapper uses grid-column/grid-row instead of position/left/top (parent must be display:grid). */
  layoutMode?: "absolute" | "grid";
  bounds?: string | Element;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
  onResizeStart?: RndResizeStartCallback;
  onResize?: RndResizeCallback;
  onResizeStop?: RndResizeCallback;
  onDragStart?: RndDragCallback;
  onDrag?: RndDragCallback;
  onDragStop?: RndDragCallback;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  enableResizing?: ResizeEnable;
  resizeHandleClasses?: HandleClasses;
  resizeHandleStyles?: HandleStyles;
  resizeHandleWrapperClass?: string;
  resizeHandleWrapperStyle?: React.CSSProperties;
  resizeHandleComponent?: HandleComponent;
  lockAspectRatio?: boolean | number;
  lockAspectRatioExtraWidth?: number;
  lockAspectRatioExtraHeight?: number;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  dragAxis?: "x" | "y" | "both" | "none";
  dragHandleClassName?: string;
  disableDragging?: boolean;
  cancel?: string;
  enableUserSelectHack?: boolean;
  dragPositionOffset?: DraggableProps["positionOffset"];
  allowAnyClick?: boolean;
  scale?: number;
  [key: string]: any;
}

const resizableStyle = {
  width: "auto" as "auto",
  height: "auto" as "auto",
  display: "inline-block" as "inline-block",
  position: "absolute" as "absolute",
  top: 0,
  left: 0,
};

const getEnableResizingByFlag = (flag: boolean): Enable => ({
  bottom: flag,
  bottomLeft: flag,
  bottomRight: flag,
  left: flag,
  right: flag,
  top: flag,
  topLeft: flag,
  topRight: flag,
});

function positionPercentToPx(
  percent: Position,
  parentSize: { width: number; height: number },
): Position {
  return {
    x: (percent.x / 100) * parentSize.width,
    y: (percent.y / 100) * parentSize.height,
  };
}

function positionPxToPercent(
  px: Position,
  parentSize: { width: number; height: number },
): Position {
  const { width, height } = parentSize;
  return {
    x: width <= 0 ? 0 : (px.x / width) * 100,
    y: height <= 0 ? 0 : (px.y / height) * 100,
  };
}

export type GridCellDimensions = { columnWidth: number; rowHeight: number };

export function getGridCellDimensions(
  parentSize: { width: number; height: number },
  gridConfig: GridConfig,
): GridCellDimensions {
  return {
    columnWidth: parentSize.width / gridConfig.columns,
    rowHeight: gridConfig.rowHeight,
  };
}

export function gridPositionToPx(
  gridPos: GridPosition,
  cell: GridCellDimensions,
): Position {
  return {
    x: gridPos.columnStart * cell.columnWidth,
    y: gridPos.rowStart * cell.rowHeight,
  };
}

export function gridSizeToPx(
  gridSize: GridSize,
  cell: GridCellDimensions,
): { width: number; height: number } {
  return {
    width: gridSize.columnSpan * cell.columnWidth,
    height: gridSize.rowSpan * cell.rowHeight,
  };
}

export function pxToGridPosition(
  px: Position,
  cell: GridCellDimensions,
): GridPosition {
  return {
    columnStart: Math.round(px.x / cell.columnWidth),
    rowStart: Math.round(px.y / cell.rowHeight),
  };
}

export function pxToGridSize(
  size: { width: number; height: number },
  cell: GridCellDimensions,
): GridSize {
  return {
    columnSpan: Math.max(1, Math.round(size.width / cell.columnWidth)),
    rowSpan: Math.max(1, Math.round(size.height / cell.rowHeight)),
  };
}

export function pxToGridPlacement(
  position: Position,
  size: { width: number; height: number },
  cell: GridCellDimensions,
): GridPlacement {
  const start = pxToGridPosition(position, cell);
  const span = pxToGridSize(size, cell);
  return {
    columnStart: start.columnStart,
    rowStart: start.rowStart,
    columnEnd: start.columnStart + span.columnSpan,
    rowEnd: start.rowStart + span.rowSpan,
  };
}

interface DefaultProps {
  maxWidth: number;
  maxHeight: number;
  onResizeStart: RndResizeStartCallback;
  onResize: RndResizeCallback;
  onResizeStop: RndResizeCallback;
  onDragStart: RndDragCallback;
  onDrag: RndDragCallback;
  onDragStop: RndDragCallback;
  scale: number;
}

export class Rnd extends React.PureComponent<Props, State> {
  public static defaultProps: DefaultProps = {
    maxWidth: Number.MAX_SAFE_INTEGER,
    maxHeight: Number.MAX_SAFE_INTEGER,
    scale: 1,
    onResizeStart: () => {},
    onResize: () => {},
    onResizeStop: () => {},
    onDragStart: () => {},
    onDrag: () => {},
    onDragStop: () => {},
  };
  resizable!: Resizable;
  draggable!: Draggable;
  resizingPosition = { x: 0, y: 0 };
  offsetFromParent = { left: 0, top: 0 };
  resizableElement: { current: HTMLElement | null } = { current: null };
  originalPosition = { x: 0, y: 0 };

  constructor(props: Props) {
    super(props);
    this.state = {
      resizing: false,
      bounds: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      parentSize: null,
    };

    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.getMaxSizesFromProps = this.getMaxSizesFromProps.bind(this);
  }

  componentDidMount() {
    this.updateParentSize();
    this.updateOffsetFromParent();
    const { left, top } = this.offsetFromParent;
    const positionUnit = this.props.positionUnit ?? "px";
    const defaultValue = this.props.default;
    let parentSize: { width: number; height: number } | null = null;
    if (this.resizable) {
      try {
        parentSize = this.getParentSize();
      } catch {
        // refs may not be ready
      }
    }

    if (positionUnit === "%" && defaultValue && parentSize && "x" in defaultValue) {
      const px = positionPercentToPx(
        { x: defaultValue.x, y: defaultValue.y },
        parentSize,
      );
      this.draggable.setState({
        x: px.x - left,
        y: px.y - top,
      });
    } else if (positionUnit === "grid" && defaultValue && parentSize && "columnStart" in defaultValue && this.props.gridConfig) {
      const cell = getGridCellDimensions(parentSize, this.props.gridConfig);
      const px = gridPositionToPx(
        { columnStart: defaultValue.columnStart, rowStart: defaultValue.rowStart },
        cell,
      );
      this.draggable.setState({
        x: px.x - left,
        y: px.y - top,
      });
    } else {
      const { x, y } = this.getDraggablePosition();
      this.draggable.setState({
        x: x - left,
        y: y - top,
      });
    }
    // HACK: Apply position adjustment
    this.forceUpdate();
  }

  componentDidUpdate() {
    this.updateParentSize();
  }

  updateParentSize() {
    const parent = this.getParent();
    if (!parent || !this.resizable) return;
    try {
      const { width, height } = this.getParentSize();
      const prev = this.state.parentSize;
      if (!prev || prev.width !== width || prev.height !== height) {
        this.setState({ parentSize: { width, height } });
      }
    } catch {
      // getParentSize may throw before refs are ready
    }
  }

  // HACK: To get `react-draggable` state x and y.
  getDraggablePosition(): { x: number; y: number } {
    const { x, y } = (this.draggable as any).state;
    return { x, y };
  }

  getParent() {
    return this.resizable && (this.resizable as any).parentNode;
  }

  getParentSize(): { width: number; height: number } {
    return (this.resizable as any).getParentSize();
  }

  getMaxSizesFromProps(): MaxSize {
    const maxWidth = typeof this.props.maxWidth === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
    const maxHeight = typeof this.props.maxHeight === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
    return { maxWidth, maxHeight };
  }

  getSelfElement(): HTMLElement | null {
    return this.resizable && this.resizable.resizable;
  }

  getOffsetHeight(boundary: HTMLElement) {
    const scale = this.props.scale as number;
    switch (this.props.bounds) {
      case "window":
        return window.innerHeight / scale;
      case "body":
        return document.body.offsetHeight / scale;
      default:
        return boundary.offsetHeight;
    }
  }

  getOffsetWidth(boundary: HTMLElement) {
    const scale = this.props.scale as number;
    switch (this.props.bounds) {
      case "window":
        return window.innerWidth / scale;
      case "body":
        return document.body.offsetWidth / scale;
      default:
        return boundary.offsetWidth;
    }
  }

  onDragStart(e: RndDragEvent, data: DraggableData) {
    if (this.props.onDragStart && this.props.onDragStart(e, data) === false) {
      return false;
    }
    const pos = this.getDraggablePosition();
    this.originalPosition = pos;
    if (!this.props.bounds) return;
    const parent = this.getParent();
    const scale = this.props.scale as number;
    let boundary;
    if (this.props.bounds === "parent") {
      boundary = parent;
    } else if (this.props.bounds === "body") {
      const parentRect = parent.getBoundingClientRect();
      const parentLeft = parentRect.left;
      const parentTop = parentRect.top;
      const bodyRect = document.body.getBoundingClientRect();
      const left = -(parentLeft - parent.offsetLeft * scale - bodyRect.left) / scale;
      const top = -(parentTop - parent.offsetTop * scale - bodyRect.top) / scale;
      const right = (document.body.offsetWidth - this.resizable.size.width * scale) / scale + left;
      const bottom = (document.body.offsetHeight - this.resizable.size.height * scale) / scale + top;
      return this.setState({ bounds: { top, right, bottom, left } });
    } else if (this.props.bounds === "window") {
      if (!this.resizable) return;
      const parentRect = parent.getBoundingClientRect();
      const parentLeft = parentRect.left;
      const parentTop = parentRect.top;
      const left = -(parentLeft - parent.offsetLeft * scale) / scale;
      const top = -(parentTop - parent.offsetTop * scale) / scale;
      const right = (window.innerWidth - this.resizable.size.width * scale) / scale + left;
      const bottom = (window.innerHeight - this.resizable.size.height * scale) / scale + top;
      return this.setState({ bounds: { top, right, bottom, left } });
    } else if (typeof this.props.bounds === "string") {
      boundary = document.querySelector(this.props.bounds);
    } else if (this.props.bounds instanceof HTMLElement) {
      boundary = this.props.bounds;
    }
    if (!(boundary instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
      return;
    }
    const boundaryRect = boundary.getBoundingClientRect();
    const boundaryLeft = boundaryRect.left;
    const boundaryTop = boundaryRect.top;
    const parentRect = parent.getBoundingClientRect();
    const parentLeft = parentRect.left;
    const parentTop = parentRect.top;
    const left = (boundaryLeft - parentLeft) / scale;
    const top = boundaryTop - parentTop;
    if (!this.resizable) return;
    this.updateOffsetFromParent();
    const offset = this.offsetFromParent;
    this.setState({
      bounds: {
        top: top - offset.top,
        right: left + (boundary.offsetWidth - this.resizable.size.width) - offset.left / scale,
        bottom: top + (boundary.offsetHeight - this.resizable.size.height) - offset.top,
        left: left - offset.left / scale,
      },
    });
  }

  getGridCellDimensions(): GridCellDimensions | null {
    const { gridConfig } = this.props;
    if (!gridConfig) return null;
    try {
      const parentSize = this.getParentSize();
      return getGridCellDimensions(parentSize, gridConfig);
    } catch {
      return null;
    }
  }

  getPositionForCallback(px: Position): Position | GridPosition {
    const positionUnit = this.props.positionUnit ?? "px";
    if (positionUnit === "%") {
      try {
        const parentSize = this.getParentSize();
        return positionPxToPercent(px, parentSize);
      } catch {
        return px;
      }
    }
    if (positionUnit === "grid") {
      const cell = this.getGridCellDimensions();
      if (cell) return pxToGridPosition(px, cell);
    }
    return px;
  }

  getGridPlacementForCallback(position: Position, width: number, height: number): GridPlacement | null {
    const cell = this.getGridCellDimensions();
    if (!cell) return null;
    return pxToGridPlacement(position, { width, height }, cell);
  }

  onDrag(e: RndDragEvent, data: DraggableData) {
    if (!this.props.onDrag) return;
    const { left, top } = this.offsetFromParent;
    let pos: Position;
    if (!this.props.dragAxis || this.props.dragAxis === "both") {
      pos = { x: data.x + left, y: data.y + top };
    } else if (this.props.dragAxis === "x") {
      pos = { x: data.x + left, y: this.originalPosition.y + top };
    } else {
      pos = { x: this.originalPosition.x + left, y: data.y + top };
    }
    const position = this.getPositionForCallback(pos);
    if (!this.props.dragAxis || this.props.dragAxis === "both") {
      return this.props.onDrag(e, { ...data, ...position });
    } else if (this.props.dragAxis === "x") {
      return this.props.onDrag(e, { ...data, ...position, deltaY: 0 });
    } else if (this.props.dragAxis === "y") {
      return this.props.onDrag(e, { ...data, ...position, deltaX: 0 });
    }
  }

  onDragStop(e: RndDragEvent, data: DraggableData) {
    if (!this.props.onDragStop) return;
    const { left, top } = this.offsetFromParent;
    let pos: Position;
    if (!this.props.dragAxis || this.props.dragAxis === "both") {
      pos = { x: data.x + left, y: data.y + top };
    } else if (this.props.dragAxis === "x") {
      pos = { x: data.x + left, y: this.originalPosition.y + top };
    } else {
      pos = { x: this.originalPosition.x + left, y: data.y + top };
    }
    const position = this.getPositionForCallback(pos);
    const payload = { ...data, ...position };
    if (this.props.positionUnit === "grid" && this.resizable) {
      const w = this.resizable.size.width as number;
      const h = this.resizable.size.height as number;
      const gridPlacement = this.getGridPlacementForCallback(pos, w, h);
      if (gridPlacement) (payload as any).gridPlacement = gridPlacement;
    }
    if (!this.props.dragAxis || this.props.dragAxis === "both") {
      return this.props.onDragStop(e, payload);
    } else if (this.props.dragAxis === "x") {
      return this.props.onDragStop(e, { ...payload, deltaY: 0 });
    } else if (this.props.dragAxis === "y") {
      return this.props.onDragStop(e, { ...payload, deltaX: 0 });
    }
  }

  onResizeStart(
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
    dir: ResizeDirection,
    elementRef: HTMLElement,
  ) {
    if (this.props.onResizeStart && this.props.onResizeStart(e, dir, elementRef) === false) {
      return false;
    }
    e.stopPropagation();
    this.setState({
      resizing: true,
    });
    const scale = this.props.scale as number;
    const offset = this.offsetFromParent;
    const pos = this.getDraggablePosition();
    this.resizingPosition = { x: pos.x + offset.left, y: pos.y + offset.top };
    this.originalPosition = pos;

    if (this.props.bounds) {
      const parent = this.getParent();
      let boundary;
      if (this.props.bounds === "parent") {
        boundary = parent;
      } else if (this.props.bounds === "body") {
        boundary = document.body;
      } else if (this.props.bounds === "window") {
        boundary = window;
      } else if (typeof this.props.bounds === "string") {
        boundary = document.querySelector(this.props.bounds);
      } else if (this.props.bounds instanceof HTMLElement) {
        boundary = this.props.bounds;
      }

      const self = this.getSelfElement();
      if (
        self instanceof Element &&
        (boundary instanceof HTMLElement || boundary === window) &&
        parent instanceof HTMLElement
      ) {
        let { maxWidth, maxHeight } = this.getMaxSizesFromProps();
        const parentSize = this.getParentSize();
        if (maxWidth && typeof maxWidth === "string") {
          if (maxWidth.endsWith("%")) {
            const ratio = Number(maxWidth.replace("%", "")) / 100;
            maxWidth = parentSize.width * ratio;
          } else if (maxWidth.endsWith("px")) {
            maxWidth = Number(maxWidth.replace("px", ""));
          }
        }
        if (maxHeight && typeof maxHeight === "string") {
          if (maxHeight.endsWith("%")) {
            const ratio = Number(maxHeight.replace("%", "")) / 100;
            maxHeight = parentSize.height * ratio;
          } else if (maxHeight.endsWith("px")) {
            maxHeight = Number(maxHeight.replace("px", ""));
          }
        }
        const selfRect = self.getBoundingClientRect();
        const selfLeft = selfRect.left;
        const selfTop = selfRect.top;
        const boundaryRect = this.props.bounds === "window" ? { left: 0, top: 0 } : boundary.getBoundingClientRect();
        const boundaryLeft = boundaryRect.left;
        const boundaryTop = boundaryRect.top;
        const offsetWidth = this.getOffsetWidth(boundary);
        const offsetHeight = this.getOffsetHeight(boundary);
        const hasLeft = dir.toLowerCase().endsWith("left");
        const hasRight = dir.toLowerCase().endsWith("right");
        const hasTop = dir.startsWith("top");
        const hasBottom = dir.startsWith("bottom");

        if ((hasLeft || hasTop) && this.resizable) {
          const max = (selfLeft - boundaryLeft) / scale + this.resizable.size.width;
          this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
        }
        // INFO: To set bounds in `lock aspect ratio with bounds` case. See also that story.
        if (hasRight || (this.props.lockAspectRatio && !hasLeft && !hasTop)) {
          const max = offsetWidth + (boundaryLeft - selfLeft) / scale;
          this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
        }
        if ((hasTop || hasLeft) && this.resizable) {
          const max = (selfTop - boundaryTop) / scale + this.resizable.size.height;
          this.setState({
            maxHeight: max > Number(maxHeight) ? maxHeight : max,
          });
        }
        // INFO: To set bounds in `lock aspect ratio with bounds` case. See also that story.
        if (hasBottom || (this.props.lockAspectRatio && !hasTop && !hasLeft)) {
          const max = offsetHeight + (boundaryTop - selfTop) / scale;
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
  }

  onResize(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    elementRef: HTMLElement,
    delta: { height: number; width: number },
  ) {
    // INFO: Apply x and y position adjustments caused by resizing to draggable
    const newPos = { x: this.originalPosition.x, y: this.originalPosition.y };
    const left = -delta.width;
    const top = -delta.height;
    const directions: ResizeDirection[] = ["top", "left", "topLeft", "bottomLeft", "topRight"];

    if (directions.includes(direction)) {
      if (direction === "bottomLeft") {
        newPos.x += left;
      } else if (direction === "topRight") {
        newPos.y += top;
      } else {
        newPos.x += left;
        newPos.y += top;
      }
    }

    const draggableState = this.draggable.state as unknown as { x: number; y: number };
    if (newPos.x !== draggableState.x || newPos.y !== draggableState.y) {
      flushSync(() => {
        this.draggable.setState(newPos);
      });
    }

    this.updateOffsetFromParent();
    const offset = this.offsetFromParent;
    const x = this.getDraggablePosition().x + offset.left;
    const y = this.getDraggablePosition().y + offset.top;

    this.resizingPosition = { x, y };
    if (!this.props.onResize) return;
    const position = this.getPositionForCallback({ x, y });
    this.props.onResize(e, direction, elementRef, delta, position);
  }

  onResizeStop(
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    elementRef: HTMLElement,
    delta: { height: number; width: number },
  ) {
    this.setState({
      resizing: false,
    });
    const { maxWidth, maxHeight } = this.getMaxSizesFromProps();
    this.setState({ maxWidth, maxHeight });
    if (this.props.onResizeStop) {
      const position = this.getPositionForCallback(this.resizingPosition);
      const gridPlacement =
        this.props.positionUnit === "grid" || this.props.sizeUnit === "grid"
          ? this.getGridPlacementForCallback(
              this.resizingPosition,
              elementRef.offsetWidth,
              elementRef.offsetHeight,
            )
          : undefined;
      this.props.onResizeStop(e, direction, elementRef, delta, position, gridPlacement ?? undefined);
    }
  }

  updateSize(size: { width: number | string; height: number | string } | GridSize) {
    if (!this.resizable) return;
    if ("columnSpan" in size && "rowSpan" in size && this.props.sizeUnit === "grid" && this.props.gridConfig) {
      try {
        const parentSize = this.getParentSize();
        const cell = getGridCellDimensions(parentSize, this.props.gridConfig);
        const px = gridSizeToPx(size, cell);
        this.resizable.updateSize({ width: px.width, height: px.height });
      } catch {
        // fallback no-op if refs not ready
      }
    } else {
      this.resizable.updateSize({ width: (size as any).width, height: (size as any).height });
    }
  }

  updatePosition(position: Position | GridPosition) {
    const positionUnit = this.props.positionUnit ?? "px";
    if (positionUnit === "%" && "x" in position && "y" in position) {
      try {
        const parentSize = this.getParentSize();
        const px = positionPercentToPx(position, parentSize);
        const { left, top } = this.offsetFromParent;
        this.draggable.setState({ x: px.x - left, y: px.y - top });
      } catch {
        this.draggable.setState(position as Position);
      }
    } else if (positionUnit === "grid" && "columnStart" in position && this.props.gridConfig) {
      try {
        const parentSize = this.getParentSize();
        const cell = getGridCellDimensions(parentSize, this.props.gridConfig);
        const px = gridPositionToPx(position, cell);
        const { left, top } = this.offsetFromParent;
        this.draggable.setState({ x: px.x - left, y: px.y - top });
      } catch {
        // fallback no-op if refs not ready
      }
    } else if ("x" in position && "y" in position) {
      this.draggable.setState(position as Position);
    }
  }

  updateOffsetFromParent() {
    const scale = this.props.scale as number;
    const parent = this.getParent();
    const self = this.getSelfElement();
    if (!parent || self === null) {
      return {
        top: 0,
        left: 0,
      };
    }
    const parentRect = parent.getBoundingClientRect();
    const parentLeft = parentRect.left;
    const parentTop = parentRect.top;
    const selfRect = self.getBoundingClientRect();
    const position = this.getDraggablePosition();
    const scrollLeft = parent.scrollLeft;
    const scrollTop = parent.scrollTop;
    this.offsetFromParent = {
      left: selfRect.left - parentLeft + scrollLeft - position.x * scale,
      top: selfRect.top - parentTop + scrollTop - position.y * scale,
    };
  }

  render() {
    const {
      disableDragging,
      style,
      dragHandleClassName,
      position,
      onMouseDown,
      onMouseUp,
      dragAxis,
      dragGrid,
      bounds,
      enableUserSelectHack,
      cancel,
      children,
      onResizeStart,
      onResize,
      onResizeStop,
      onDragStart,
      onDrag,
      onDragStop,
      resizeHandleStyles,
      resizeHandleClasses,
      resizeHandleComponent,
      enableResizing,
      resizeGrid,
      resizeHandleWrapperClass,
      resizeHandleWrapperStyle,
      scale,
      allowAnyClick,
      dragPositionOffset,
      positionUnit = "px",
      sizeUnit = "px",
      gridConfig,
      layoutMode = "absolute",
      size: sizeProp,
      ...resizableProps
    } = this.props;
    const defaultValue = this.props.default ? { ...this.props.default } : undefined;
    // Remove unknown props, see also https://reactjs.org/warnings/unknown-prop.html
    delete resizableProps.default;

    const { left, top } = this.offsetFromParent;
    const parentSize = this.state.parentSize;
    const gridCell: GridCellDimensions | null =
      gridConfig && parentSize ? getGridCellDimensions(parentSize, gridConfig) : null;

    const cursorStyle = disableDragging || dragHandleClassName ? { cursor: "auto" } : { cursor: "move" };
    const innerStyle: React.CSSProperties = {
      ...resizableStyle,
      ...cursorStyle,
      ...style,
    };
    if (layoutMode === "grid" && gridCell != null) {
      let placement: GridPlacement;
      if (position && "columnStart" in position && sizeProp && "columnSpan" in sizeProp) {
        placement = {
          columnStart: (position as GridPosition).columnStart,
          rowStart: (position as GridPosition).rowStart,
          columnEnd: (position as GridPosition).columnStart + (sizeProp as GridSize).columnSpan,
          rowEnd: (position as GridPosition).rowStart + (sizeProp as GridSize).rowSpan,
        };
      } else if (this.resizable && typeof this.resizable.size?.width === "number" && typeof this.resizable.size?.height === "number") {
        const pos = this.getDraggablePosition();
        placement = pxToGridPlacement(
          { x: pos.x + left, y: pos.y + top },
          { width: this.resizable.size.width as number, height: this.resizable.size.height as number },
          gridCell,
        );
      } else {
        placement = { columnStart: 0, rowStart: 0, columnEnd: 1, rowEnd: 1 };
      }
      Object.assign(innerStyle, {
        position: "relative" as const,
        gridColumn: `${placement.columnStart + 1} / ${placement.columnEnd + 1}`,
        gridRow: `${placement.rowStart + 1} / ${placement.rowEnd + 1}`,
        left: undefined,
        top: undefined,
      });
    }

    let draggablePosition: { x: number; y: number } | undefined;
    if (position) {
      let positionPx: Position;
      if (positionUnit === "%" && parentSize && "x" in position) {
        positionPx = positionPercentToPx(position as Position, parentSize);
      } else if (positionUnit === "grid" && gridCell && "columnStart" in position) {
        positionPx = gridPositionToPx(position as GridPosition, gridCell);
      } else if ("x" in position && "y" in position) {
        positionPx = position as Position;
      } else {
        positionPx = { x: 0, y: 0 };
      }
      draggablePosition = {
        x: positionPx.x - left,
        y: positionPx.y - top,
      };
    }

    // Effective drag/resize grid: when in grid mode, snap to grid cell size
    const effectiveDragGrid: Grid | undefined =
      gridCell && positionUnit === "grid" ? [gridCell.columnWidth, gridCell.rowHeight] : dragGrid;
    const effectiveResizeGrid: Grid | undefined =
      gridCell && (positionUnit === "grid" || sizeUnit === "grid") ? [gridCell.columnWidth, gridCell.rowHeight] : resizeGrid;

    // Size for Resizable: convert grid to px when sizeUnit is "grid"
    let sizeForResizable: Size | undefined;
    if (sizeProp !== undefined) {
      if (sizeUnit === "grid" && gridCell && "columnSpan" in sizeProp) {
        const px = gridSizeToPx(sizeProp as GridSize, gridCell);
        sizeForResizable = { width: px.width, height: px.height };
      } else {
        sizeForResizable = sizeProp as Size;
      }
    }

    // Default size for Resizable: when default is grid shape, convert to px
    let defaultSizeForResizable: { x?: number; y?: number; width: number; height: number } | undefined = defaultValue as any;
    if (defaultValue && "columnSpan" in defaultValue && gridCell) {
      const px = gridSizeToPx(
        { columnSpan: defaultValue.columnSpan, rowSpan: defaultValue.rowSpan },
        gridCell,
      );
      defaultSizeForResizable = {
        width: px.width,
        height: px.height,
      };
    }

    // In % or grid mode, default position is applied in componentDidMount; pass 0,0 so Draggable gets numeric values
    const defaultPositionForDraggable: { x: number; y: number } | undefined =
      defaultValue && positionUnit === "%" && "x" in defaultValue && typeof defaultValue.x === "number" && typeof defaultValue.y === "number"
        ? { x: 0, y: 0 }
        : defaultValue && positionUnit === "grid" && "columnStart" in defaultValue
          ? { x: 0, y: 0 }
          : defaultValue && "x" in defaultValue && "y" in defaultValue
            ? { x: (defaultValue as any).x, y: (defaultValue as any).y }
            : undefined;
    // INFO: Make uncontorolled component when resizing to control position by setPostion.
    const pos = this.state.resizing ? undefined : draggablePosition;
    const dragAxisOrUndefined = this.state.resizing ? "both" : dragAxis;

    return (
      <Draggable
        ref={(c: Draggable) => {
          if (!c) return;
          this.draggable = c;
        }}
        handle={dragHandleClassName ? `.${dragHandleClassName}` : undefined}
        defaultPosition={defaultPositionForDraggable}
        onMouseDown={onMouseDown}
        // @ts-expect-error react-draggable accepts onMouseUp at runtime
        onMouseUp={onMouseUp}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        axis={dragAxisOrUndefined}
        disabled={disableDragging}
        grid={effectiveDragGrid}
        bounds={bounds ? this.state.bounds : undefined}
        position={pos}
        enableUserSelectHack={enableUserSelectHack}
        cancel={cancel}
        scale={scale}
        allowAnyClick={allowAnyClick}
        nodeRef={this.resizableElement}
        positionOffset={dragPositionOffset}
      >
        <Resizable
          {...resizableProps}
          ref={(c: Resizable | null) => {
            if (!c) return;
            this.resizable = c;
            this.resizableElement.current = c.resizable;
          }}
          defaultSize={defaultSizeForResizable}
          size={sizeForResizable}
          enable={typeof enableResizing === "boolean" ? getEnableResizingByFlag(enableResizing) : enableResizing}
          onResizeStart={this.onResizeStart}
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          style={innerStyle}
          minWidth={this.props.minWidth}
          minHeight={this.props.minHeight}
          maxWidth={this.state.resizing ? this.state.maxWidth : this.props.maxWidth}
          maxHeight={this.state.resizing ? this.state.maxHeight : this.props.maxHeight}
          grid={effectiveResizeGrid}
          handleWrapperClass={resizeHandleWrapperClass}
          handleWrapperStyle={resizeHandleWrapperStyle}
          lockAspectRatio={this.props.lockAspectRatio}
          lockAspectRatioExtraWidth={this.props.lockAspectRatioExtraWidth}
          lockAspectRatioExtraHeight={this.props.lockAspectRatioExtraHeight}
          handleStyles={resizeHandleStyles}
          handleClasses={resizeHandleClasses}
          handleComponent={resizeHandleComponent}
          scale={this.props.scale}
        >
          {children}
        </Resizable>
      </Draggable>
    );
  }
}
