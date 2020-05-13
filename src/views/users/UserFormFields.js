import React, { Component } from "react";

// Components
import Text from "../../components/core/Text";

class UserFormFields extends Component {
  // Render the form fields
  render() {
    return (
      <div>
        <div className="card bg-white mt-3 mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
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
          </div>
        </div>
      </div>
    );
  }
}

export default UserFormFields;
