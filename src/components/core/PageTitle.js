import React from "react";
import PropTypes from "prop-types";

class PageTitle extends React.Component {
  render() {
    const { label } = this.props;

    return (
      <h5
        className="page-title mt-2 mb-4 font-weight-bold"
        style={{ display: "inline-block" }}
      >
        {label}
      </h5>
    );
  }
}

PageTitle.propTypes = {
  label: PropTypes.string
};

export default PageTitle;
