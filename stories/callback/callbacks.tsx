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
    onResizeStart={action("onResizeStart")}
    onResize={action("onResize")}
    onResizeStop={action("onResizeStop")}
    onDragStart={action("onDragStart")}
    onDrag={action("onDrag")}
    onDragStop={action("onDragStop")}
    onClick={action("onClick")}
    onDoubleClick={action("onDoubleClick")}
  >
    001
  </Rnd>
);
