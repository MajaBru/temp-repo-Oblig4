import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loader() {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100
  };

  return (
    <div style={style}>
      <RotatingLines
        strokeColor="#1c2841"
        strokeWidth="4"
        animationDuration="1"
        width="55"
        visible={true}
      />
    </div>
  );
}

export default Loader;
