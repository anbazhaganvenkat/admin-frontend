import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

// Assets
import { CrossIcon, OctagonAlertIcon } from "../../assets/img/icons";

class AlertWarning extends React.Component {
  render() {
    const { messageTitle, message, onClick, button } = this.props;

    return (
      <div className="alerts-wrapper">
        <Alert
          color="danger"
          className={
            "d-flex align-items-center justify-content-stretch text-white"
          }
        >
          <OctagonAlertIcon />
          <p
            className="ml-3 mb-0 mr-auto text-white"
            style={{ fontSize: "15px" }}
          >
            {messageTitle ? <b>{messageTitle}</b> : ""}
            {message}
          </p>
          <div className="close-alert mr-0 ml-0">
            {button ? (
              button
            ) : (
              <button
                className="btn-plain btn text-white p-0"
                onClick={onClick}
              >
                <CrossIcon />
              </button>
            )}
          </div>
        </Alert>
      </div>
    );
  }
}

AlertWarning.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func
};

export default AlertWarning;
