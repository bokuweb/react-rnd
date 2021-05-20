import * as React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

export default () => (
  <div style={{ transform: "scale(0.7)" }}>
    <div style={{ marginLeft: "30px" }}>
      <Rnd
        style={style}
        bounds="window"
        scale={0.7}
        default={{
          width: 200,
          height: 200,
          x: 0,
          y: 0,
        }}
      >
        001
      </Rnd>
    </div>
  </div>
);
