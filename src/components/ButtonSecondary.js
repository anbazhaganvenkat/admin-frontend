import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class ButtonSecondary extends React.Component {
  render() {
    const { onClick, className, style, label } = this.props;

    return (
      <Button
        outline
        onClick={onClick}
        type="button"
        className={className}
        style={style}
      >
        {label}
      </Button>
    );
  }
}

ButtonSecondary.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default ButtonSecondary;
