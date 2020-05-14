import React, { Component } from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import Notifications from "react-notification-system-redux";
import Loadable from "react-loadable";
import history from "./history";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie } from "./lib/helper";

/** Layouts **/
import DefaultLayout from "./containers/DefaultLayout";

/** Views **/
import Dashboard from "./views/dashboard";
import LoginPage from "./views/login";

// Users
import Users from "./views/users";
import AddUser from "./views/users/AddUser";
import UserDetails from "./views/users/userDetails";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// 404 error page
const Page404 = Loadable({
  loader: () => import("./views/Page404"),
  loading,
});

/*
   App
 */
class App extends Component {
  bodyClass(authenticated) {
    if (!authenticated) {
      document.body.classList.remove("loggedin-layout");
    } else {
      document.body.classList.add("loggedin-layout");
    }
  }

  componentDidMount() {
    this.bodyClass(getCookie("session_token"));
  }

  componentWillReceiveProps(nextProps) {
    this.bodyClass(getCookie("session_token"));
  }

  componentWillUnmount() {
    this.bodyClass(getCookie("session_token"));
  }

  render() {
    const { notifications } = this.props;
    return (
      <div>
        <Notifications notifications={notifications} />
        <ToastContainer
          autoClose={4000}
          pauseOnHover={false}
          toastClassName="toastRequestSuccess"
          bodyClassName="toastBody"
        />
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>

              <DefaultLayout
                exact
                name="Dashboard"
                path="/dashboard"
                component={Dashboard}
              />

              <DefaultLayout
                exact
                name="Users"
                path="/users"
                component={Users}
              />
              <DefaultLayout
                exact
                name="New User"
                path="/user/new"
                component={AddUser}
              />
              <DefaultLayout
                exact
                name="User Details"
                path="/user/edit/:id"
                component={UserDetails}
              />

              <DefaultLayout
                exact
                name="Page 404"
                path=""
                component={Page404}
              />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
