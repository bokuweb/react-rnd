import React from "react";
import { Rnd } from "../../src";
import { style } from "../styles";

export default () => (
  <>
    {[0, 1, 2].map((i) => (
      <Rnd
        style={{
          ...style,
          zIndex: i,
        }}
        key={`rnd${i}`}
        default={{
          width: 200,
          height: 200,
          x: i * 100,
          y: i * 100,
        }}
      >
        00{i}
      </Rnd>
    ))}
  </>
);
