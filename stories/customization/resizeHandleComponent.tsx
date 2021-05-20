import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

const SouthEastArrow = () => (
  <svg width="20px" height="20px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m70.129 67.086l1.75-36.367c-0.035156-2.6523-2.9414-3.6523-4.8164-1.7773l-8.4531 8.4531-17.578-17.574c-2.3438-2.3438-5.7188-1.5625-8.0586 0.78125l-13.078 13.078c-2.3438 2.3438-2.4141 5.0117-0.074219 7.3516l17.574 17.574-8.4531 8.4531c-1.875 1.875-0.83594 4.8203 1.8164 4.8555l36.258-1.8594c1.6836 0.019531 3.1328-1.2812 3.1133-2.9688z" />
  </svg>
);

const CustomHandle = (props) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "2px",
      border: "1px solid #ddd",
      height: "100%",
      width: "100%",
      padding: 0,
    }}
    className={"SomeCustomHandle"}
    {...props}
  />
);
const BottomRightHandle = () => (
  <CustomHandle>
    <SouthEastArrow />
  </CustomHandle>
);

export default () => (
  <Rnd
    style={style}
    default={{
      width: 200,
      height: 200,
      x: 0,
      y: 0,
    }}
    resizeHandleComponent={{ bottomRight: <BottomRightHandle /> }}
  >
    001
  </Rnd>
);
