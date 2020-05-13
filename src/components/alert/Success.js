import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

// Assets
import { CheckmarkCircleIcon, CrossIcon } from "../../assets/img/icons";

class AlertSuccess extends React.Component {
  render() {
    const { message, onClick } = this.props;

    return (
      <Alert
        color="success"
        className={
          "d-flex align-items-center justify-content-stretch text-white"
        }
      >
        <CheckmarkCircleIcon />
        <p className="ml-3 mb-0 mr-auto text-white">
          <b>Success!</b> {message}
        </p>
        <div className="close-alert mr-0 ml-0">
          <button className="btn-plain btn text-white p-0" onClick={onClick}>
            <CrossIcon />
          </button>
        </div>
      </Alert>
    );
  }
}

AlertSuccess.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func
};

export default AlertSuccess;
