import React, { useState } from "react";
import { BasicLoginForm } from "../../views/login";

// Helper
import { getCookie } from "../../lib/helper";


export const LoginForm = ({ redirect, eventKey }) => {
  return <BasicLoginForm redirect={redirect} eventKey={eventKey} />;
};

const AuthButtons = props => {
  const { children } = props;

  return (
    <>
      <div className="signup-buttons">{children}</div>
    </>
  );
};

export default AuthButtons;
