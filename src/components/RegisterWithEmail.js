import React, { useState } from "react";
import useToggle from "./customhooks/useToggle";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Email from "./core/Email";
import Text from "./core/Text";

const RegisterWithEmail = props => {
  const { next, isOpen, toggle } = props;
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={["edit-task-modal"].join(" ")}
    >
      <ModalHeader toggle={toggle}>
        <h4 className={["font-weight-bold"].join(" ")}>Signup with Email</h4>
      </ModalHeader>
      <ModalBody className={["mb-4"].join(" ")}>
        <div className="form-wrapper justify-content-center d-flex flex-column">
          <div className="field-wrapper">
            <Email
              name="email"
              label="Email Address"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="field-wrapper">
            <Text
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              notify="true"
              error=""
              required
            />
            <Text
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              notify="true"
              error=""
              required
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={["justify-content-center"].join(" ")}>
        <div className="btn-wrapper">
          <button className="btn btn-outline-secondary mr-2" onClick={toggle}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              toggle();
              next();
            }}
          >
            Continue
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default RegisterWithEmail;
