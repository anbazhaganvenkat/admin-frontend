import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class CancelButton extends React.Component {
  render() {
    const { onClick, className, name } = this.props;

    return (
      <Button
        outline
        onClick={onClick}
        type="button"
        className={`m-1 ${className}`}
        style={{
          borderRadius: "7px",
          width: "90px",
          fontSize: ".875rem"
        }}
      >
        <span>{name || "Cancel"}</span>
      </Button>
    );
  }
}

CancelButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default CancelButton;
