import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class SaveButton extends React.Component {
  render() {
    const { onClick, loading, className, align } = this.props;

    return (
      <Button
        disabled={loading}
        onClick={onClick}
        type={"submit"}
        className={`m-1 float-${align} ${className}`}
        style={{
          borderRadius: "7px",
          minWidth: "90px",
          fontSize: ".875rem",
          lineHeight: "1.25rem",
          padding: ".5rem 1.25rem"
        }}
      >
        <span style={{ marginBottom: "5px" }}>
          {loading ? "Saving..." : "Save"}
        </span>
      </Button>
    );
  }
}

SaveButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default SaveButton;
