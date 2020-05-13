import React from "react";
import propTypes from "prop-types";

class CustomerCardEmail extends React.Component {
  getStyle = {
    marginBottom: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  };

  render() {
    return (
      <p className="text-muted" style={this.getStyle}>
        {this.props.email}
      </p>
    );
  }
}

CustomerCardEmail.propTypes = {
  email: propTypes.string.isRequired
};

export default CustomerCardEmail;
