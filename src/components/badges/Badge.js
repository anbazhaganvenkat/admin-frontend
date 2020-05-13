import React from "react";

const Badge = props => {
  const { grouped, icon, name, outlined, theme } = props;

  const outlinedBadge = () => (outlined ? "badge-outline" : "");

  const badgeTheme = () => (theme ? `badge-${theme}` : `badge-dark`);

  const badgeBody = () => {
    return grouped ? (
      <div className="input-group group-dark">
        <div className="input-group-prepend">
          <div className="input-group-text">{icon}</div>
        </div>
        <span className={`badge ${outlinedBadge()} ${badgeTheme()}`}>
          {name}
        </span>
      </div>
    ) : (
      <span className={`badge ${outlinedBadge()} ${badgeTheme()}`}>{name}</span>
    );
  };
  return badgeBody();
};

export default Badge;
