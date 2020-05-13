import React from "react";

const Badges = props => {
  const { children, grouped } = props;
  let extraClasses = grouped ? "d-flex flex-column" : "overflow-hidden";

  return <div className={`badges ${extraClasses}`}>{children}</div>;
};

export default Badges;
