import React from "react";
import { Link } from "react-router-dom";

// Components
import Email from "../../components/Email";
import Form from "../../components/Form";
import Password from "../../components/Password";
import LoginForm from "../../components/authentication/AuthButtons";

// API call
import { apiClient } from "../../apiClient";

// Configs
import { endpoints, DEFAULT_API_KEY } from "../../configs";

// Helper
import { getCookie, setCookie, getUrlParameter } from "../../lib/helper";


import { toast } from "react-toastify";

export function _userLogin(data, redirect = false) {
  apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
  return apiClient
      .post(endpoints().userLogin, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        const { token, role, email, firstName, lastName, userId } = response.data;

        setCookie("session_token", token);
        setCookie("role", role);
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
      .catch(error => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          return { errorMessage } || {};
        }
      });
}

export class RenderLoginByPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
    this._hideErrorMessage = this._hideErrorMessage.bind(this);
  }

  _hideErrorMessage = () => {
    this.setState({ errorMessage: "" });
  };

  componentWillReceiveProps(nextProps) {
    if (
        nextProps.errorMessage &&
        nextProps.errorMessage !== this.state.errorMessage
    ) {
      this.setState({ errorMessage: nextProps.errorMessage });
    }
  }

  render() {
    const { errorMessage } = this.state;
    return (
        <div className={["basic-login-form"].join(" ")}>
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
            <div className="form-group">
            <span className={errorMessage ? "error-message" : ""}>
              {errorMessage}
            </span>
            </div>
          </div>
          <div className={["field-wrapper"].join(" ")}>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-login w-100">
                Log in
              </button>
            </div>
          </div>
        </div>
    );
  }
}

export class BasicLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.setState({ redirect: typeof this.props.redirect === "function" });
  }

  render() {
    const email = getUrlParameter("email");
    const initialValues = {
      email: email || "",
      password: ""
    };
    const { errorMessage } = this.state;
    const _self = this;

    return (
        <Form
            initialValues={initialValues}
            onSubmit={values => {
              values.email = values.email ? values.email : null;
              values.password = values.password ? values.password : null;

              _userLogin(values, this.state.redirect).then(res => {
                return Object.keys(res).map(key => {
                  if (key === "errorMessage") {
                    _self.setState({ errorMessage: res[key] });
                  }

                  if (key === "successMessage" && _self.state.redirect) {
                  }
                });
              });
              return false;
            }}
        >
          <RenderLoginByPasswordForm errorMessage={errorMessage} />
        </Form>
    );
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight
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
        <div className="container-fluid">
            <div className="find-an-expert-budget-right-side-section form-wrapper flex-column d-flex justify-content-center">
                <div className="client-login-wrapper">
                    <div className="title-wrapper d-flex align-items-center">
                        <h5 className="font-weight-bold mb-0">
                            Login To Admin Portal
                        </h5>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
  }
}

export default Login;
