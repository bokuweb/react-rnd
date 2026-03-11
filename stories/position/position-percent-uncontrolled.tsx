import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

const containerStyle: React.CSSProperties = {
  width: 400,
  height: 300,
  position: "relative",
  background: "#e8e8e8",
  border: "1px solid #ccc",
};

export default function Example() {
  return (
    <div style={containerStyle}>
      <Rnd
        style={style}
        default={{
          x: "25%",
          y: "30%",
          width: 150,
          height: 100,
        }}
      >
        Default at 25%, 30% (uncontrolled)
      </Rnd>
    </div>
  );
}
