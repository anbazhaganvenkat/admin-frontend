import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class AddButton extends React.Component {
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
        <FontAwesomeIcon icon={faPlus} />

        <span style={{ marginLeft: 5 }}>{loading ? "Adding..." : "Add"}</span>
      </Button>
    );
  }
}

AddButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default AddButton;
