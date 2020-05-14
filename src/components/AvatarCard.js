import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

class AvatarCard extends React.Component {
  render() {
    const { title, firstName, lastName } = this.props;

    const names = [];
    if (firstName) {
      names.push(firstName);
    }

    if (lastName) {
      names.push(lastName);
    }

    const name = names.join(" ");

    return (
      <div style={{ display: "table" }}>
        <div
          style={{
            display: "table-cell",
            verticalAlign: "middle",
            paddingRight: 10,
          }}
        >
          <Avatar {...this.props} />
        </div>
        {(name || title) && (
          <div style={{ display: "table-cell", verticalAlign: "middle" }}>
            {name && (
              <h3 style={{ fontSize: 14, margin: "0 0 2px" }}>{name}</h3>
            )}
            {title && (
              <p style={{ fontSize: 13, margin: 0 }} className="text-muted">
                {title}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

AvatarCard.propTypes = {
  url: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  title: PropTypes.string,
  defaultUrl: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  square: PropTypes.bool,
  customSize: PropTypes.number,
};

export default AvatarCard;
