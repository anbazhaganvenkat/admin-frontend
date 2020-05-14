import React from "react";
import Page404 from "../Page404";
import { toast } from "react-toastify";
import UserFormFields from "./UserFormFields";

// Components
import Form from "../../components/Form";
import DeleteButton from "../../components/DeleteButton";
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/SaveButton";
import PageTitle from "../../components/PageTitle";

// Configs
import { endpoints } from "../../configs";

// API call
import { apiClient } from "../../apiClient";

// Helper
import {
  toString,
  getUrlParameter,
  removeMaskedPhoneNumber,
} from "../../lib/helper";

export default class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    // Set the initial input values
    this.state = {
      UserDetails: [],
      loading: false,
      isInvalidRequest: false,
    };
  }

  componentDidMount = () => {
    this._getUserDetails();
  };

  _submit = (values) => {
    if (this._validateFields(values) === false) {
      return;
    }

    // Save name form in the final
    this._updateUser(this._toArray(values));
  };

  // Validate Fields
  _validateFields(values) {
    let success = true;

    // define user constants
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
    values.phoneNumber = values.phoneNumber
      ? removeMaskedPhoneNumber(values.phoneNumber)
      : "";
    console.log(values);
    return values;
  }

  // User update API Call
  _updateUser(data) {
    return apiClient
      .put(`${endpoints().userAPI}/${this.props.match.params.id}`, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        // window.location.replace("/users");
        const redirectUrl = getUrlParameter("redirect");
        if (redirectUrl) {
          window.location.replace(`${redirectUrl}`);
        } else {
          window.location.replace("/users");
        }
      })
      .catch((error) => {
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

  // User delete api call
  handleDelete = () => {
    return apiClient
      .delete(`${endpoints().userAPI}/${this.props.match.params.id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        window.location.replace("/users");
      })
      .catch((error) => {
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
  };

  // User details api call by id
  _getUserDetails = () => {
    return apiClient
      .get(`${endpoints().userAPI}/${this.props.match.params.id}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
        this.setState({ UserDetails: response.data, loading: true });
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
          this.setState({ isInvalidRequest: true });
        }
      });
  };

  render() {
    if (this.state.isInvalidRequest) {
      return <Page404 />;
    }

    if (!this.state.loading) {
      return "";
    }

    const { firstName, lastName, email, phoneNumber } = this.state.UserDetails;

    const initialValues = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };

    return (
      <>
        <PageTitle label="Edit User" />
        <Form
          initialValues={initialValues}
          onSubmit={(values) => {
            this._submit(values);
          }}
        >
          <UserFormFields
            UserDetails={this.state.UserDetails}
            userId={this.props.match.params.id}
          />

          <div className="mb-4">
            <DeleteButton label={"Delete User"} onClick={this.handleDelete} />
            <div className="float-right">
              <CancelButton onClick={() => this.props.history.goBack()} />
              <SaveButton />
            </div>
          </div>
        </Form>
      </>
    );
  }
}
