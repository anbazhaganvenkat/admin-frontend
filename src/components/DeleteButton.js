import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    const { label, onClick, loading, className } = this.props;
    let style;
    if (this.state.isHovering) {
      style = {
        backgroundColor: "#E86C61",
        color: "#FFF",
        border: "1px solid #E86C61",
        borderRadius: "7px",
        minWidth: "90px",
        fontSize: ".875rem",
        height: "36px"
      };
    } else {
      style = {
        backgroundColor: "transparent",
        color: "#E86C61",
        border: "1px solid #E86C61",
        borderRadius: "7px",
        minWidth: "90px",
        fontSize: ".875rem",
        height: "36px"
      };
    }
    return (
      <Button
        className={className}
        disabled={loading}
        onClick={onClick}
        type={"button"}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        style={style}
      >
        <span>{loading ? "Deleting..." : label}</span>
      </Button>
    );
  }
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  loading: PropTypes.bool
};

export default DeleteButton;
