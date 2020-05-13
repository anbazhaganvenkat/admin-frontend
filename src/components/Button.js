import React from "react";
import { Button as ReactButton } from "reactstrap";

class Button extends React.Component {
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
      label
    } = this.props;

    return (
      <ReactButton
        color={color}
        size={size}
        active={active}
        disabled={disabled}
        outline={outline}
        onClick={onClick}
        type={type || "button"}
        block={block}
        className={className}
      >
        {hideTextInMobile && (
          <span className={"d-none d-sm-none d-md-inline-block"}>
            {hideTextInMobile}{" "}
            {icon && (
              <i style={icon ? { marginLeft: 5 } : {}} className={icon} />
            )}
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
            {label}{" "}
            {icon && (
              <i style={icon ? { marginLeft: 5 } : {}} className={icon} />
            )}
          </span>
        )}
      </ReactButton>
    );
  }
}

export default Button;
