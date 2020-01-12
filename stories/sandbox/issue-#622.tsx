import React from "react";
import { Rnd } from "../../src";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderLeft: "solid 5px #ddd",
  borderRight: "solid 5px #ddd",
  borderTop: "solid 1px #ddd",
  borderBottom: "solid 1px #ddd",
  background: "#f0f0f0",
  height: "100%",
};

export default class App extends React.Component {
  state = {
    width: 200,
    height: 52,
    x: 100,
    y: 0,
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "50px",
          border: "1px solid pink",
          position: "relative",
        }}
      >
        <Rnd
          style={style}
          bounds="parent"
          enableResizing={{
            top: false,
            right: true,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          size={{ width: this.state.width, height: this.state.height }}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={(e, d) => {
            this.setState({ x: d.x, y: d.y });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            });
          }}
        >
          Rnd
        </Rnd>
      </div>
    );
  }
}
