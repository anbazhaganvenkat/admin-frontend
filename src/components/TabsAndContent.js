import React from "react";

const TabsAndContent = props => (
  <div
    className={`${["tabs-and-preview"].join(" ")} ${
      props.fullWidth ? "full-width" : ""
    } ${props.className !== undefined ? props.className : ""}`}
  >
    {props.children}
  </div>
);

export default TabsAndContent;
