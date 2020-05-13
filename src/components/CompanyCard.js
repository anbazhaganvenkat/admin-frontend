import React from "react";
import PropTypes from "prop-types";
import Avatar from "./core/Avatar";

class CompanyCard extends React.Component {
  render() {
    const { name, description } = this.props;

    return (
      <div style={{ display: "table" }}>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 10
          }}
        >
          <Avatar {...this.props} firstName={name} />
        </div>
        {(name || description) && (
          <div style={{ display: "table-cell", verticalAlign: "middle" }}>
            {name && (
              <h3 style={{ fontSize: 14, margin: "0 0 2px" }}>{name}</h3>
            )}
            {description && (
              <p style={{ fontSize: 13, margin: 0 }} className="text-muted">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

CompanyCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  defaultUrl: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  customSize: PropTypes.number
};

export default CompanyCard;
