import * as React from "react";
import { Rnd } from "../../src";
import { style, parentBoundary } from "../styles";

export default () => (
  <div style={{ ...parentBoundary, transform: "scale(0.5)" }}>
    <div style={{ width: "100%", height: "100%" }}>
      <Rnd
        style={style}
        bounds="parent"
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
