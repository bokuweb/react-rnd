import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

type State = {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
};

export default class dragAxisX extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    };
  }

  render() {
    return (
      <Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        onDrag={(e, d) => {
          console.log("onDrag", d);
        }}
        onDragStop={(e, d) => {
          console.log(d);
          this.setState({ ...this.state, ...d });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            ...this.state,
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
        dragAxis="none"
      >
        001
      </Rnd>
    );
  }
}
