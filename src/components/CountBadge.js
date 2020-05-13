import React from "react";

const CountBadge = props => {
  const { isActive, count, badgeColor } = props;

  let badgeBGColor;
  if (badgeColor) {
    badgeBGColor = badgeColor;
  } else {
    badgeBGColor = isActive ? "#0a9dda" : "#BDBDC0";
  }

  return count > 0 ? (
    <React.Fragment>
      <div
        className="d-inline-block ml-2 pl-2 pr-2 status rounded-pill"
        style={{
          backgroundColor: badgeBGColor,
          color: "#FFFFFF"
        }}
      >
        {count}
      </div>
    </React.Fragment>
  ) : (
    <></>
  );
};

export default CountBadge;
