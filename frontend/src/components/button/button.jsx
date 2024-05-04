import React from "react";
import "./button.css";

const Button = ({ children, variant }) => {
  // Define classNames based on variant prop
  const buttonClass = `button ${variant ? `button-${variant}` : ""}`;

  return <button className={buttonClass}>{children}</button>;
};

export default Button;
