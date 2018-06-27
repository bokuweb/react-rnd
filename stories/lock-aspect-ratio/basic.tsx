import React from "react";
import Rnd from "../../src";
import { style } from "../styles";

export default () => (
  <Rnd
    style={style}
    default={{
      width: 200,
      height: 160,
      x: 0,
      y: 0,
    }}
    lockAspectRatio
  >
    001
  </Rnd>
);
