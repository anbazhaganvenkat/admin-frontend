import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class PrimaryButton extends React.Component {
  render() {
    const { onClick, className, style, label } = this.props;

    return (
      <Button
        outline
        onClick={onClick}
        type="button"
        className={`m-1 ${className}`}
        style={style}
      >
        {label}
      </Button>
    );
  }
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default PrimaryButton;
