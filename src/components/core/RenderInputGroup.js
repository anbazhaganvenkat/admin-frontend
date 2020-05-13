import React from "react";

const RenderInputGroup = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default RenderInputGroup;
