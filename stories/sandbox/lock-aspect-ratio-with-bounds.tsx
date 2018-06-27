import React from "react";
import Rnd from "../../src";
import { style, parentBoundary } from "../styles";

export default () => (
  <div style={parentBoundary}>
    <Rnd
      style={style}
      default={{
        width: 200,
        height: 160,
        x: 0,
        y: 0,
      }}
      bounds="parent"
      lockAspectRatio
    >
      001
    </Rnd>
  </div>
);
