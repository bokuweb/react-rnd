import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

type State = {
  x: number; // percentage of container width
  y: number; // percentage of container height
  width: number;
  height: number;
};

const containerStyle: React.CSSProperties = {
  width: 400,
  height: 300,
  position: "relative",
  background: "#e8e8e8",
  border: "1px solid #ccc",
};

export default class Example extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      width: 120,
      height: 80,
      x: 10,
      y: 20,
    };
  }

  render() {
    return (
      <div style={containerStyle}>
        <Rnd
          style={style}
          size={{
            width: this.state.width,
            height: this.state.height,
          }}
          position={{
            x: `${this.state.x}%`,
            y: `${this.state.y}%`,
          }}
          onDragStop={(e, d) => {
            const containerWidth = containerStyle.width as number;
            const containerHeight = containerStyle.height as number;
            const x = (d.x / containerWidth) * 100;
            const y = (d.y / containerHeight) * 100;
            this.setState({ x, y });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const containerWidth = containerStyle.width as number;
            const containerHeight = containerStyle.height as number;
            const x = (position.x / containerWidth) * 100;
            const y = (position.y / containerHeight) * 100;
            this.setState({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x,
              y,
            });
          }}
        >
          Position in % (x: {this.state.x.toFixed(1)}, y: {this.state.y.toFixed(1)})
        </Rnd>
      </div>
    );
  }
}
