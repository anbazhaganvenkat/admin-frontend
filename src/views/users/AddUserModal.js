/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import AddButton from "../../components/AddButton";
import Text from "../../components/Text";
import Form from "../../components/Form";
import Phone from "../../components/Phone";

// Helper
import { toString, removeMaskedPhoneNumber } from "../../lib/helper";

// Action
import { addNewUser } from "../../actions/user";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  _submit = (values) => {
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
    values.phoneNumber = values.phoneNumber
      ? removeMaskedPhoneNumber(values.phoneNumber)
      : "";
    return values;
  }

  _toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  _createUser(data) {
    this.props.actions.addNewUser(data);
  }

  render() {
    const { isOpen } = this.state;
    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };

    return (
      <div className="">
        <AddButton
          label="New User"
          className="pull-right btn btn-secondary"
          onClick={this._toggle}
        />
        <Modal
          isOpen={isOpen}
          toggle={this._toggle}
          className="custom-modal-popup w-100"
          backdrop="static"
        >
          <ModalHeader toggle={this._toggle}>
            <div className="content-wrapper">
              <div className="icon-wrapper">
                <div className="row justify-content-center mb-2 mt-3"></div>
                <p className="text-center mb-3">Create a new User</p>
              </div>
              {/* /.icon-wrapper */}
            </div>
            {/* /.content-wrapper */}
          </ModalHeader>

          <Form
            initialValues={initialValues}
            onSubmit={(values) => {
              this._submit(values);
              setTimeout(() => {
                this._toggle();
              }, 500);
            }}
          >
            <ModalBody>
              <div className="mt-2 mb-3">
                <div>
                  <Text
                    name="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    notify="true"
                    error=""
                    required
                  />
                </div>
                <div>
                  <Text
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    error=""
                    required
                    notify="true"
                  />
                </div>
                <div>
                  <Text
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    notify="true"
                    error=""
                    required
                  />
                </div>
                <Phone
                  name="phoneNumber"
                  label="Phone"
                  placeholder="Enter Phone"
                  error=""
                  required
                  notify="true"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="container-fluid">
                <div className="col-sm-12 text-center">
                  <Button type="submit" label="">
                    Create User
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addNewUser }, dispatch),
  };
}

export default connect(() => {
  return {};
}, mapDispatchToProps)(AddUserModal);
