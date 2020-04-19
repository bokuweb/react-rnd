import React from "react";
import { Rnd } from "../../src";
import { style, parentBoundary } from "../styles";

export default () => (
  <div style={parentBoundary}>
    <Rnd
      style={style}
      bounds="parent"
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
);
