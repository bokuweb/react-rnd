import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

export default () => (
  <Rnd
    style={style}
    default={{
      x: 0,
      y: 0,
      width: 320,
      height: 200,
    }}
    minHeight="300px"
    minWidth="300px"
  >
    Rnd
  </Rnd>
);
