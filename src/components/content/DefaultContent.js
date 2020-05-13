import React from "react";

const DefaultContent = props => {
  const { children, title } = props;

  return (
    <div className="marketplace-section-content">
      <div className="content">
        {title && (
          <h4>
            <b>{title}</b>
          </h4>
        )}
        {children}
      </div>
    </div>
  );
};

export default DefaultContent;
