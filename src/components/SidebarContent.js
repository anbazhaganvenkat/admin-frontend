import React from "react";

const SidebarContent = props => {
  const { children, title } = props;
  return (
    <div className="sidebar-content-box sidebar-content">
      {title && (
        <p>
          <b>{title}</b>
        </p>
      )}

      {children}
    </div>
  );
};

export default SidebarContent;
