import React from "react";
import { Rnd } from "../../src";
import { style, parentBoundary, selectorBoundary } from "../styles";

export default () => (
  <div className="boundary" style={{ ...selectorBoundary, transform: "scale(0.7)" }}>
    <div style={parentBoundary}>
      <Rnd
        style={style}
        bounds=".boundary"
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
