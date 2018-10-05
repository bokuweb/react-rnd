import React from "react";
import { Rnd } from "../../src";

type State = {
  x: number;
  y: number;
  width: number;
  height: number;
  restrict: "x" | "y" | "both" | "none";
};

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
};
export default class RestrictDrag extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      width: 200,
      height: 200,
      x: 0,
      y: 80,
      restrict: "x",
    };
  }
  handleDragStop = (e, d) => {
    const restrictedAxis = this.state.restrict;
    let pos = {};
    switch (restrictedAxis) {
      case "x":
        pos = {
          x: d.x,
        };
        break;
      case "y":
        pos = {
          y: d.y,
        };
        break;
      case "both":
        pos = {
          x: d.x,
          y: d.y,
        };
        break;
      case "none":
        pos = {};
        break;
      default:
        pos = {};
        break;
    }
    this.setState({ ...pos });
  };

  render() {
    console.log("STATE", this.state);
    return (
      <div>
        <label>
          Restrict Axis:{" "}
          <select
            onChange={e => {
              this.setState({ restrict: e.target.value as "x" | "y" | "both" | "none" });
            }}
          >
            <option value="x">X</option>
            <option value="y">Y</option>
            <option value="both">Both</option>
            <option value="none">None</option>
          </select>
        </label>
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
          onDragStop={this.handleDragStop}
          dragAxis={this.state.restrict}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
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
  }
}
