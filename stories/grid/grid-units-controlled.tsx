import React from "react";
import { Rnd, GridConfig, GridPlacement, GridPosition, GridSize } from "../../src";
import { style } from "../styles";

const ROW_HEIGHT = 8;
const COLUMNS = 24;
const CONTAINER_WIDTH = 480;
const CONTAINER_HEIGHT = 320;

const gridConfig: GridConfig = {
  columns: COLUMNS,
  rowHeight: ROW_HEIGHT,
};

const containerStyle: React.CSSProperties = {
  width: CONTAINER_WIDTH,
  height: CONTAINER_HEIGHT,
  boxSizing: "border-box",
  position: "relative",
  background: "#fafafa",
  outline: "1px solid #ccc",
  overflow: "hidden",
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
  `,
  backgroundSize: `${CONTAINER_WIDTH / COLUMNS}px ${ROW_HEIGHT}px`,
};

type State = {
  position: GridPosition;
  size: GridSize;
};

export default class GridUnitsControlled extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      position: { columnStart: 2, rowStart: 3 },
      size: { columnSpan: 6, rowSpan: 4 },
    };
  }

  render() {
    const { position, size } = this.state;
    return (
      <div style={containerStyle}>
        <Rnd
          style={style}
          gridConfig={gridConfig}
          positionUnit="grid"
          sizeUnit="grid"
          position={position}
          size={size}
          onDragStop={(
            _e,
            d: { columnStart: number; rowStart: number; gridPlacement?: GridPlacement },
          ) => {
            if ("columnStart" in d && "rowStart" in d) {
              this.setState({
                position: { columnStart: d.columnStart, rowStart: d.rowStart },
              });
            }
          }}
          onResizeStop={(
            _e,
            _dir,
            ref,
            _delta,
            _position,
            gridPlacement?: GridPlacement,
          ) => {
            if (gridPlacement) {
              this.setState({
                position: {
                  columnStart: gridPlacement.columnStart,
                  rowStart: gridPlacement.rowStart,
                },
                size: {
                  columnSpan: gridPlacement.columnEnd - gridPlacement.columnStart,
                  rowSpan: gridPlacement.rowEnd - gridPlacement.rowStart,
                },
              });
            }
          }}
        >
          <div style={{ fontSize: 11 }}>
            positionUnit="grid" · sizeUnit="grid"
            <br />
            columnStart: {position.columnStart} · rowStart: {position.rowStart}
            <br />
            columnSpan: {size.columnSpan} · rowSpan: {size.rowSpan}
          </div>
        </Rnd>
      </div>
    );
  }
}
