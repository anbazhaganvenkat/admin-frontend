import React, { Component } from "react";

// Components
import Text from "../../components/Text";
import Phone from "../../components/Phone";

class UserFormFields extends Component {
  // Render the form fields
  render() {
    return (
      <div>
        <div className="card bg-white mt-3 mb-3">
          <div className="card-body">
            <div className="row field-wrapper">
              <div className="col-lg-6 col-sm-12">
                <Text
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  notify="true"
                  error=""
                  required
                />
                <Text
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                  notify="true"
                  error=""
                  required
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <Text
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  error=""
                  required
                  notify="true"
                />
                <Phone
                  name="phoneNumber"
                  label="Phone"
                  placeholder="Enter Phone"
                  error=""
                  required
                  notify="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserFormFields;
