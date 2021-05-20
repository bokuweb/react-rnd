import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

type State = {
  rnds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
};

export default class Example extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      rnds: [0, 1, 2].map((i) => ({
        width: 200,
        height: 200,
        x: i * 100,
        y: i * 100,
      })),
    };
  }

  render() {
    return (
      <>
        {[0, 1, 2].map((i) => (
          <Rnd
            key={`rnd${i}`}
            style={style}
            size={{
              width: this.state.rnds[i].width,
              height: this.state.rnds[i].height,
            }}
            position={{
              x: this.state.rnds[i].x,
              y: this.state.rnds[i].y,
            }}
            onDragStop={(e, d) => {
              const rnds = [...this.state.rnds];
              rnds[i] = { ...rnds[i], x: d.x, y: d.y };
              this.setState({ rnds });
            }}
            onResize={(e, direction, ref, delta, position) => {
              const rnds = [...this.state.rnds];
              rnds[i] = {
                ...rnds[i],
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              };
              this.setState({
                rnds,
              });
            }}
          >
            00{i}
          </Rnd>
        ))}
      </>
    );
  }
}
