import "./App.css";
import { useState } from "react";

import { Rnd } from "../../../src";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
} as const;

const App = () => {
  const [size, updateSize] = useState({ width: 200, height: 200 });
  const [position, updatePosition] = useState({ x: 0, y: 0 });
  return (
    <Rnd
      style={style}
      size={size}
      position={position}
      onDragStop={(e, d) => {
        updatePosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateSize({
          width: Number(ref.style.width),
          height: Number(ref.style.height),
        });
        updatePosition(position)
      }}
    >
      Rnd
    </Rnd>
  );
};

export default App;
