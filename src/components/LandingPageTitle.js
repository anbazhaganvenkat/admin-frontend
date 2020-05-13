import React from "react";

class LandingPageTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="section-title col-md-9">
        <div className="form-inline">
          <span
            className="h1 d-block"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "550px",
              minWidth: "auto",
              resize: "horizontal"
            }}
          >
            {this.props.name}
          </span>
          <span
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px"
            }}
            className="ml-2 mt-n5 cursor-pointer"
            onClick={this.props.handleEdit}
          >
            <i className="fas fa-pen" />
          </span>
        </div>
      </div>
    );
  }
}

export default LandingPageTitle;
