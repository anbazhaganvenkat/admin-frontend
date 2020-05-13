import React from "react";
import propTypes from "prop-types";

class CustomerCardName extends React.Component {
  // Join first and last name
  getName = (firstName, lastName) => {
    const name = [];
    if (firstName) {
      name.push(firstName);
    }
    if (lastName) {
      name.push(lastName);
    }

    return name.join(" ");
  };

  render() {
    const { firstName, lastName } = this.props;

    return (
      <h5 style={{ marginBottom: "2px", fontSize: "1.15rem" }}>
        {this.getName(firstName, lastName)}
      </h5>
    );
  }
}

CustomerCardName.propTypes = {
  firstName: propTypes.string.isRequired,
  lastName: propTypes.string.isRequired
};

export default CustomerCardName;
