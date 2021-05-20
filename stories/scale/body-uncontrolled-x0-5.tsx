import * as React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

export default () => (
  <div style={{ transform: "scale(0.5)" }}>
    <div style={{ marginLeft: "30px" }}>
      <Rnd
        style={style}
        bounds="body"
        scale={0.5}
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
