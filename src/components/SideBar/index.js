import React from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { getNavList } from "../../_nav";
import "./styles.scss";

class Index extends React.Component {
  // Render Sidebar list
  renderSideBarList(currentRoute) {
    return getNavList().map((navigation, key) => (
      <li
        key={key}
        className={
          currentRoute === navigation.url
            ? `active`
            : currentRoute === navigation.addPageurl
            ? `active`
            : currentRoute.startsWith(navigation.editPageurl)
            ? `active`
            : ""
        }
      >
        <Link to={navigation.url}>
          <SVG src={navigation.icon} />
          <span className="desktop-only">{navigation.name}</span>
        </Link>
      </li>
    ));
  }

  render() {
    const currentRoute = window.location.pathname;

    return (
      <>
        <nav
          id="sidebar"
          className={[
            "site-sidebar",
            `${!this.props.enable ? "disabled" : ""}`
          ].join(" ")}
        >
          <ul className="list-unstyled mb-0 pb-3">
            {/*render the sidebar menu*/}
            {this.renderSideBarList(currentRoute)}
          </ul>
        </nav>
      </>
    );
  }
}

export default Index;
