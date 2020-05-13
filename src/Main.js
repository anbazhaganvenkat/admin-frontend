import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Notifications from "react-notification-system-redux";
import Loadable from "react-loadable";
import history from "./history";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getCookie } from "./lib/helper";

import DefaultLayout from "./containers/DefaultLayout";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// 404 error page
const Page404 = Loadable({
  loader: () => import("./views/Page404"),
  loading
});

export class Main extends React.Component {
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
          autoClose={9000}
          hideProgressBar={true}
          pauseOnHover={false}
          toastClassName="toastRequestSuccess"
          bodyClassName="toastBody"
          closeButton={false}
        />
        <div className="routeSection">
          <Router history={history}>
            <Switch>
              <Route path="/" name="Home" component={DefaultLayout} />
              <Route exact path="/404" name="Page 404" component={Page404} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;
