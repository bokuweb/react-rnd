import React from "react";
import { Rnd } from "../../src";
import { style, parentBoundary } from "../styles";

type State = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const Example: React.FC = () => {
  const [state, setState] = React.useState<State>({
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  });
  const [boundaryElm, setBoundaryElm] = React.useState<HTMLDivElement>();
  return (
    <div style={parentBoundary} ref={(elm) => setBoundaryElm(elm!)}>
      <Rnd
        style={style}
        bounds={boundaryElm}
        size={{
          width: state.width,
          height: state.height,
        }}
        position={{
          x: state.x,
          y: state.y,
        }}
        onDragStop={(e: any, d: any) => {
          setState({ ...state, x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            ...position,
          });
        }}
      >
        001
      </Rnd>
    </div>
  );
};

export default Example;
