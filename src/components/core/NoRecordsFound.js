import React from "react";
import SVG from "react-inlinesvg";
import Button from "./Button";

const top = "9vh";
const middle = "75vh";

const NoRecordsFound = props => {
  const {
    hideCard,
    icon,
    iconClass,
    description,
    message,
    buttonLabel,
    buttonLink,
    buttonIcon,
    position
  } = props;

  const root = {
    minHeight: position === "top" ? top : middle
  };

  return (
    <div
      className={`${
        !hideCard ? "card mb-5" : ""
      } d-flex align-items-center justify-content-center`}
      style={root}
    >
      {icon && (
        <div className={`no-records-icon ${iconClass ? iconClass : ""} mb-4`}>
          <SVG src={icon} />
        </div>
      )}

      {message && <h5 className="font-weight-bold">{message}</h5>}
      {description && <p>{description}</p>}

      {buttonLink && (
        <a href={buttonLink}>
          <Button label={buttonLabel} icon={buttonIcon} />
        </a>
      )}
    </div>
  );
};

export default NoRecordsFound;
