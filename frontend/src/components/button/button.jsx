import React from "react";
import "./button.css";

const Button = ({ children, variant, onClick }) => {
  // Define classNames based on variant prop
  const buttonClass = `button ${variant ? `button-${variant}` : ""}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
