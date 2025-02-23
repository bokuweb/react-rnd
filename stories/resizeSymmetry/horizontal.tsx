import React, {CSSProperties} from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

const lineStyle: CSSProperties = {
  width: "120%",
  top: "50%",
  border: "dashed 1px #9C27B0",
  position: 'absolute'
}

export default () => (
  <Rnd
    style={style}
    default={{
      width: 200,
      height: 200,
      x: 0,
      y: 0,
    }}
    resizeSymmetry="horizontal"
  >
    <div style={lineStyle} />
  </Rnd>
);
