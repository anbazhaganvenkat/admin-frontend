import React from "react";
import AddUserForm from "./AddUserForm";

// Components
import PageTitle from "../../components/PageTitle";

const AddUser = props => {
  return (
    <div>
      <PageTitle label="New user" />
      <AddUserForm history={props.history} />
    </div>
  );
};

export default AddUser;
