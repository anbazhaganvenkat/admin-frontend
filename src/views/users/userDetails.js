import React from "react";
import UpdateUserForm from "./updateUserForm";

const UserDetails = props => {
  return <UpdateUserForm history={props.history} match={props.match} />;
};

export default UserDetails;
