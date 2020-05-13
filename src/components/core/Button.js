import React from "react";
import { Button as ReactButton } from "reactstrap";

class Button extends React.Component {
  state = {
    color: this.props.color || ""
  };

  hoverIn = () => {
    this.setState({ color: this.props.hoverColor || this.props.color });
  };

  hoverOut = () => {
    this.setState({ color: this.props.color });
  };

  render() {
    const {
      size,
      active,
      disabled,
      outline,
      children,
      color,
      type,
      className,
      onClick,
      icon,
      hideTextInMobile,
      block,
      label,
      align
    } = this.props;

    return (
      <ReactButton
        size={size}
        active={active}
        disabled={disabled}
        outline={outline}
        onClick={onClick}
        type={type || "button"}
        block={block}
        className={`m-1 float-${align} ${className}`}
        style={{
          backgroundColor: this.state.color,
          borderColor: this.state.color
        }}
        onMouseEnter={this.hoverIn}
        onMouseLeave={this.hoverOut}
      >
        {hideTextInMobile && (
          <span className={"d-none d-sm-none d-md-inline-block"}>
            {icon && (
              <i style={icon ? { marginRight: 5 } : {}} className={icon} />
            )}
            {hideTextInMobile}
          </span>
        )}
        {label && (
          <span
            className={
              hideTextInMobile
                ? "d-block d-sm-block d-md-none d-lg-none d-lg-none"
                : ""
            }
          >
            {icon && (
              <i style={icon ? { marginRight: 5 } : {}} className={icon} />
            )}
            {label}
          </span>
        )}
      </ReactButton>
    );
  }
}

export default Button;
