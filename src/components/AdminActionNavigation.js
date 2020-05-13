import React, { useState } from "react";

const AdminActionNavigation = props => {
  const { children: buttons } = props;
  return (
    <div className="admin-action-navigation d-flex justify-content-between flex-lg-row flex-column">
      {buttons}
    </div>
  );
};

export default AdminActionNavigation;
