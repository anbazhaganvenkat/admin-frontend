import React from "react";
import CountBadge from "./CountBadge";
import { Link } from "react-router-dom";
import Redirect from "react-router-dom/Redirect";

export default class TabLink extends React.Component {
  render() {
    const {
      onClick,
      link,
      badgeCount,
      isActive,
      label,
      status,
      redirect,
      badgeColor
    } = this.props;

    const activeTab = isActive ? " active" : "";

    return (
      <>
        <div className={`pb-2 ${activeTab}`}>
          {!status ? <Redirect to={redirect} /> : ""}
          <Link to={link} onClick={onClick} className="link pl-4 pr-4">
            {label}
            {badgeCount ? (
              <CountBadge
                badgeColor={badgeColor ? badgeColor : ""}
                count={badgeCount}
                isActive={isActive}
              />
            ) : (
              ""
            )}
          </Link>
        </div>
      </>
    );
  }
}
