import React from "react";
import { Rnd } from "../../src";
import { style, parentBoundary } from "../styles";

export default () => {
  const [boundaryElm, setBoundaryElm] = React.useState<HTMLDivElement>();
  return (
    <div style={parentBoundary} ref={(ref) => setBoundaryElm(ref!)}>
      {boundaryElm && (
        <Rnd
          style={style}
          bounds={boundaryElm}
          default={{
            width: 200,
            height: 200,
            x: 0,
            y: 0,
          }}
        >
          001
        </Rnd>
      )}
    </div>
  );
};
