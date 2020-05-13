import React from "react";

class Count extends React.Component {
  render() {
    const { count, status } = this.props;

    return (
      <div
        className="d-inline-block pl-2 pr-2 status rounded-pill"
        style={{
          backgroundColor: status ? "#0a9dda" : "#BDBDC0",
          color: "#FFFFFF"
        }}
      >
        {count}
      </div>
    );
  }
}

export default Count;
