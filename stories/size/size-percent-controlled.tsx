import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

type State = {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
};

export default class Example extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      width: "30%",
      height: "30%",
      x: 0,
      y: 0,
    };
  }

  render() {
    return (
      <Rnd
        style={style}
        size={{
          width: this.state.width,
          height: this.state.height,
        }}
        position={{
          x: this.state.x,
          y: this.state.y,
        }}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
      >
        001
      </Rnd>
    );
  }
}
