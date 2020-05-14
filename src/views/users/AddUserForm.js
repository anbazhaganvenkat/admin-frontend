import React from "react";
import { toast } from "react-toastify";
import UserFormFields from "./UserFormFields";

import Form from "../../components/Form";
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/SaveButton";

// Configs
import { endpoints } from "../../configs";

// API call
import { apiClient } from "../../apiClient";

// Helper
import { toString } from "../../lib/helper";

export default class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
  }

  _submit = values => {
    if (this._validateFields(values) === false) {
      return;
    }

    // Save user form in the final
    this._createUser(this._toArray(values));
  };

  // Validate Fields
  _validateFields(values) {
    let success = true;
    const email = values.email;

    if (!email) {
      success = false;
    }

    return success;
  }

  // To Array
  _toArray(values) {
    values.firstName = toString(values.firstName);
    values.lastName = toString(values.lastName);
    values.email = toString(values.email);
    values.roleId = values.roleId ? values.roleId.value : values.roleId;
    return values;
  }

  // Project API Call
  _createUser(data) {
    return apiClient
      .post(endpoints().userAPI, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        window.location.replace("/users");
      })
      .catch(error => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  }

  render() {
    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      roleId: ""
    };

    return (
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          this._submit(values);
        }}
      >
        <UserFormFields />
        <div className="d-flex justify-content-end">
          <CancelButton onClick={() => this.props.history.goBack()} />
          <SaveButton />
        </div>
      </Form>
    );
  }
}
