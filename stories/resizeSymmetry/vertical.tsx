import React, {CSSProperties} from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

const innerDiv: CSSProperties = {
  display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "dashed 1px #9C27B0",
    height: "120%",
};

export default () => (
  <Rnd
    style={style}
    default={{
      width: 200,
      height: 200,
      x: 0,
      y: 0,
    }}
    resizeSymmetry="vertical"
  >
    <div style={innerDiv}>
      
    </div>
  </Rnd>
);
