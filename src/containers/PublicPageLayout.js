import React, { Component, useEffect, useState } from "react";
import { Link, Route, matchPath } from "react-router-dom";
import defaultLogo from "../assets/logo.svg";
import {
  Navbar,
  NavbarBrand,
  Container,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import UserNavDropdown from "../components/header/UserNavDropdown";
import Footer from "../components/footer/Footer";
import EndFooter from "../components/footer/EndFooter";
import { TORCHLITE_WEBSITE_URL } from "../configs";

const PublicPageLayout = ({ children, match }) => {
  const hideComponent =
    match.url.includes("/marketplace") ||
    match.url.includes("/expert-signup") ||
    match.url.includes("/find-an-expert") ||
    match.url.includes("/customer-signup") ||
    match.url.includes("/playbook-view") ||
    match.url.includes("/login");
  return (
    <div>
      {!hideComponent && (
        <Navbar className="navbar navbar-expand-lg bg-white-ivory">
          <Container className={["justify-content-stretch"].join(" ")}>
            <NavbarBrand href={TORCHLITE_WEBSITE_URL}>
              <img
                src={defaultLogo}
                alt="Torchlite"
                className="jss1557"
                width="140"
                height="29"
              />
            </NavbarBrand>
            <Nav
              className={[
                "nav-wrapper",
                "d-flex",
                "h6-5",
                "font-weight-bold"
              ].join(" ")}
            >
              <NavItem>
                <NavLink href={`${TORCHLITE_WEBSITE_URL}/how-it-works/`}>
                  How it Works
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href={`${TORCHLITE_WEBSITE_URL}/pricing/`}>
                  Pricing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/expert-signup">I’m an Expert</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/find-an-expert">Find an Expert</NavLink>
              </NavItem>
            </Nav>
            <UserNavDropdown />
          </Container>
        </Navbar>
      )}
      {children}
      {!hideComponent && <Footer />}
      {!hideComponent && <EndFooter />}
    </div>
  );
};

const PublicPageLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <PublicPageLayout {...matchProps}>
          <Component {...matchProps} />
        </PublicPageLayout>
      )}
    />
  );
};

export default PublicPageLayoutRoute;
