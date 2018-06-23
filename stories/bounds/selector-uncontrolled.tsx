import React from "react";
import Rnd from "../../";
import { style, parentBoundary, selectorBoundary } from "../styles";

export default () => (
  <div className="boundary" style={selectorBoundary}>
    <div style={parentBoundary}>
      <Rnd
        style={style}
        bounds=".boundary"
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
