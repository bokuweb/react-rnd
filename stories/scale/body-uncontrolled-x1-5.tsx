import * as React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

export default () => (
  <div style={{ transform: "scale(1.5)" }}>
    <div style={{ marginLeft: "30px" }}>
      <Rnd
        style={style}
        bounds="body"
        scale={1.5}
        default={{
          width: 200,
          height: 200,
          x: 100,
          y: 100,
        }}
      >
        001
      </Rnd>
    </div>
  </div>
);
