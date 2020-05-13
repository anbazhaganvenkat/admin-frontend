import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class UpdateButton extends React.Component {
  render() {
    const { type, onClick, loading, className, style } = this.props;

    return (
      <Button
        color="primary"
        disabled={loading}
        onClick={onClick}
        type={type || "button"}
        className={className}
        style={style}
      >
        {loading ? "Updating..." : "Update"}
      </Button>
    );
  }
}

UpdateButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default UpdateButton;
