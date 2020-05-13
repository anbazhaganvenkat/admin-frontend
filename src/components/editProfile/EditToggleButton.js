import React from "react";
import PropTypes from "prop-types";

import { EditIconSimple, EyeIcon } from "../../assets/img/icons";

const EditToggleButton = ({ editable, onClickHandler }) => {
  return (
    <button
      className={["edit-btn", "btn", "btn-link"].join(" ")}
      onClick={onClickHandler}
    >
      {editable ? <EyeIcon /> : <EditIconSimple />}
    </button>
  );
};

EditToggleButton.propTypes = {
  editable: PropTypes.bool,
  onClickHandler: PropTypes.func
};

export default EditToggleButton;
