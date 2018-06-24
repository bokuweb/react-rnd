import React from "react";
import { action } from "@storybook/addon-actions";
import Rnd from "../../src";
import { style } from "../styles";

export default () => (
  <Rnd
    style={style}
    default={{
      width: 200,
      height: 200,
      x: 0,
      y: 0,
    }}
    onMouseDown={action("onMouseDown")}
  >
    001
  </Rnd>
);
