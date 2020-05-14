import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// routes config
import routes from "../../routes";

import SideBar from "../../components/SideBar";

import { getCookie, isExpert } from "../../lib/helper";

import { Navbar, NavbarBrand } from "reactstrap";
import { apiClient } from "../../apiClient";
import { endpoints, TORCHLITE_WEBSITE_URL } from "../../configs";
import UserNavDropdown from "../../components/header/UserNavDropdown";

const DefaultFooter = React.lazy(() => import("./DefaultFooter"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      avatarUrl: "",
      isLoading: false,
      userId: null,
      allowAccess: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const currentPath = window.location.pathname + window.location.search;
    let redirectUrl = "";
    if (currentPath) {
      redirectUrl = `?redirect=${currentPath}`;
    }

    if (!getCookie("session_token") && currentPath !== "/login") {
      // if session_token is null redirect login
      window.location.replace(`/login${redirectUrl}`);
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { allowAccess } = this.state;

    const pathName = window.location.href;

    let showNav = "";
    if (
      pathName.includes("/find-an-expert") > 0 ||
      pathName.includes("/expert-signup") > 0 ||
      pathName.includes("/playbook-view") > 0
    ) {
      showNav = "d-none";
    }

    let changeNavBarColor;
    if (pathName.includes("/expert-availability") > 0) {
      changeNavBarColor = "bg-color-black";
    }

    return (
      <div className="app">
        <div className="app-body">
          <main className="main drawer-container">
            {pathName.includes("/expert-availability") > 0 && (
              <navbar
                className={`navbar navbar-expand-lg ${showNav} ${changeNavBarColor}`}
              >
                <h2><b>Admin Portal</b></h2>
              </navbar>
            )}

            {!pathName.includes("/login") && (
              <Navbar
                className={`navbar navbar-expand-lg ${showNav} ${changeNavBarColor}`}
              >
                <div className="container">
                  <NavbarBrand
                    id="logo"
                    className="site-logo"
                    href={TORCHLITE_WEBSITE_URL}
                  >
                    <h2><b>Admin Portal</b></h2>
                  </NavbarBrand>
                  <div className="nav-wrapper d-flex align-items-center">
                    <UserNavDropdown enable={allowAccess} />
                  </div>
                  {/* /.nav-wrapper */}
                </div>
              </Navbar>
            )}

            {getCookie("session_token") &&
            !pathName.includes("/expert-availability") &&
            !pathName.includes("/find-an-expert") &&
            !pathName.includes("/expert-profile/") &&
            !pathName.includes("/expert-signup") ? (
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 w-auto">
                    <SideBar enable={allowAccess} />
                  </div>
                  <div className="col col-lg-9 pr-md-0">
                    <div className="site-maincontent">
                      <Suspense>
                        <Switch>
                          {routes.map((route, idx) => {
                            return route.component ? (
                              <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => (
                                  <route.component {...props} />
                                )}
                              />
                            ) : null;
                          })}
                        </Switch>
                      </Suspense>
                    </div>
                    {/* /.main-content */}
                  </div>
                </div>
              </div>
            ) : (
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                </Switch>
              </Suspense>
            )}
          </main>
        </div>
        <footer className={`footer ${showNav}`}>
          <div className="container">
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </div>
        </footer>
      </div>
    );
  }
}

export default DefaultLayout;
