import React from "react";
import { Link } from "react-router-dom";

// Components
import Email from "../../components/Email";
import Form from "../../components/Form";
import Password from "../../components/Password";

// API call
import { apiClient } from "../../apiClient";

// Configs
import { endpoints, DEFAULT_API_KEY } from "../../configs";

// Helper
import { getCookie, setCookie, getUrlParameter } from "../../lib/helper";

import { toast } from "react-toastify";

export function _userLogin(data, redirect = false) {
  console.log(data);
  return apiClient
    .post(endpoints().userLogin, data)
    .then((response) => {
      let successMessage;
      if (response && response.data) {
        successMessage = response.data.message;
      }

      const { token, userId } = response.data;

      setCookie("session_token", token);
      setCookie("userId", userId);

      if (!redirect) {
        const redirectUrl = getUrlParameter("redirect");

        if (redirectUrl) {
          window.location.replace(redirectUrl);
        } else {
          window.location.replace("/dashboard");
        }
      }

      return { successMessage } || {};
    })
    .catch((error) => {
      if (error.response && error.response.status >= 400) {
        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
          toast.error(errorMessage);
        }
        return { errorMessage } || {};
      }
    });
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this._updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._updateDimensions);
  }

  componentWillMount() {
    const redirectUrl = getUrlParameter("redirect");
    const { preventRedirect = false } = this.props;

    console.log(preventRedirect, "preventredirect");

    if (redirectUrl && !getCookie("session_token") && !preventRedirect) {
      this.props.history.push(`/login?redirect=${redirectUrl}`);
    } else if (getCookie("session_token") && !preventRedirect) {
      // if session_token redirect to dashboard
      this.props.history.push("/dashboard");
    }
  }

  render() {
    let redirectUrl = getUrlParameter("redirect");
    if (!redirectUrl) {
      redirectUrl = "/dashboard";
    }

    return (
      <div className="p-3 mt-5">
        <div className="card rounded p-4 m-auto" style={{ maxWidth: "450px" }}>
          <h5 className="font-weight-bold mt-4 mb-4 text-center">
            Login To Admin Portal
          </h5>
          <div className={["basic-login-form", ""].join(" ")}>
            <Form
              onSubmit={(values) => {
                values.email = values.email ? values.email : null;
                values.password = values.password ? values.password : null;

                _userLogin(values);
              }}
            >
              <div className={["field-wrapper"].join("")}>
                <Email
                  name="email"
                  placeholder="Email Address"
                  onKeyDown={this._hideErrorMessage}
                  required
                />
              </div>

              <div className={["field-wrapper"].join(" ")}>
                <Password
                  name="password"
                  placeholder="Password"
                  onKeyDown={this._hideErrorMessage}
                  required
                />
              </div>
              <div className={["field-wrapper"].join(" ")}>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-login w-100">
                    Log in
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
