import React from "react";
import Rnd from "../../src";
import { style } from "../styles";

export default () => (
  <Rnd
    style={style}
    cancel=".cancel"
    default={{
      width: 200,
      height: 200,
      x: 0,
      y: 0,
    }}
  >
    <div
      className="cancel"
      style={{ width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      001
    </div>
  </Rnd>
);
