/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import AddButton from "../../components/AddButton";
import Text from "../../components/Text";
import Form from "../../components/Form";

// Helper
import { toString } from "../../lib/helper";

// Assets
import createLandingIcon from "../../assets/pages/landing-page/create-landing-page.png";

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
    const name = values.name;

    if (!name) {
      success = false;
    }

    return success;
  }

  // To Array
  _toArray(values) {
    values.name = toString(values.name);
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
      name: "",
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
          className="custom-modal-popup"
          backdrop="static"
        >
          <ModalHeader toggle={this._toggle}>
            <div className="content-wrapper">
              <div className="icon-wrapper">
                <div className="row justify-content-center mb-2 mt-3">
                  <img src={createLandingIcon} size="30" alt="" />
                </div>
                <p className="text-center mb-3">Create a new User</p>
                <p
                  className="text-center"
                  style={{ fontSize: "14px", lineHeight: "20px" }}
                >
                  Leverage agile frameworks to provide a robust synopsis for
                  high level overviews placeholder text, replace with blurb here
                </p>
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
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    notify="true"
                    error=""
                    required
                  />
                </div>
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
