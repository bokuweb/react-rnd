import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

export default class App extends React.Component {
  state = {
    maxWidth: Number.MAX_SAFE_INTEGER,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ maxWidth: document.body.clientWidth - 100 });
    });
  }

  render() {
    return (
      <Rnd
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        maxWidth={this.state.maxWidth}
      >
        Rnd
      </Rnd>
    );
  }
}
