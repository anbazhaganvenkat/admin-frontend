import React, { useState } from "react";
import {
  LinkedinIcon,
  OfficeIcon,
  SalesforceIcon
} from "../../assets/img/icons";
import jsforce from "jsforce";
import GoogleLogin from "react-google-login";
import LinkedInLogin from "react-linkedin-login-oauth2";
import MicrosoftLogin from "react-microsoft-login";
import {
  GOOGLE_CLIENT_ID,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_REDIRECT_URI,
  OFFICE365_CLIENT_ID,
  OFFICE365_REDIRECT_URI,
  SALESFORCE_REDIRECT_URL,
  SALESFORCE_CLIENT_ID
} from "../../configs";
import useToggle from "../customhooks/useToggle";
import RegisterWithEmail from "../RegisterWithEmail";
import { BasicLoginForm } from "../../views/login";

// Helper
import { getCookie } from "../../lib/helper";

export const SalesforceLogin = (redirect, callback) => {
  jsforce.browser.init({
    clientId: SALESFORCE_CLIENT_ID,
    redirectUri: SALESFORCE_REDIRECT_URL
  });

  jsforce.browser.login();
  jsforce.browser.on("connect", function(conn) {
    if (getCookie("jsforce0_access_token")) {
      return callback(getCookie("jsforce0_access_token"));
    }
  });
};

export const SalesforceButton = ({
  redirect,
  redirectUrl,
  signUpWithSalesforce
}) => {
  return (
    <div className="signup-button">
      <a
        onClick={() => {
          SalesforceLogin(redirect, salesforceAuthToken => {
            signUpWithSalesforce(salesforceAuthToken, () => {
              if (redirectUrl) {
                window.location.replace(redirectUrl);
              } else if (redirect) {
                redirect();
              }
            });
          });
        }}
        className="button-salesforce cursor-pointer"
      >
        <span className="icon-wrapper">
          <SalesforceIcon />
        </span>
        Continue with Salesforce
      </a>
    </div>
  );
};

export const GoogleButton = ({ redirect, redirectUrl, signUpWithGoogle }) => {
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText={<span>Continue with Google</span>}
      onSuccess={response => {
        signUpWithGoogle(response.getAuthResponse().id_token, () => {
          if (redirectUrl) {
            window.location.replace(redirectUrl);
          } else if (redirect) {
            redirect();
          }
        });
      }}
      className="google-login mb-3"
      onFailure={err => console.log(err)}
    />
  );
};

export const OfficeButton = ({
  redirect,
  redirectUrl,
  toggle,
  signUpWithOffice365
}) => {
  return (
    <div className="signup-button">
      <div className="office365Login mb-3">
        <MicrosoftLogin
          clientId={OFFICE365_CLIENT_ID}
          className="office-login"
          children={
            <div className="signup-button">
              <a href="#" className="button-office">
                <span className="icon-wrapper">
                  <OfficeIcon />
                </span>
                Continue with Office
              </a>
            </div>
          }
          redirectUri={OFFICE365_REDIRECT_URI}
          authCallback={(err, data) => {
            if (err) {
              return console.log(err);
            }

            signUpWithOffice365(
              data.authResponseWithAccessToken.accessToken,
              () => {
                if (redirectUrl) {
                  window.location.replace(redirectUrl);
                } else if (redirect) {
                  redirect();
                }
              }
            );
          }}
        />
      </div>
    </div>
  );
};

export const LinkedInButton = ({
  redirect,
  redirectUrl,
  signUpWithLinkedin
}) => {
  return (
    <LinkedInLogin
      clientId={LINKEDIN_CLIENT_ID}
      className="linkedin-login"
      children={
        <div className="signup-button">
          <a href="#" className="button-linkedin">
            <span className="icon-wrapper">
              <LinkedinIcon />
            </span>
            Continue with Linkedin
          </a>
        </div>
      }
      scope="r_liteprofile,r_emailaddress"
      onFailure={err => console.log(JSON.stringify(err))}
      onSuccess={data => {
        signUpWithLinkedin(data.code, () => {
          if (redirectUrl) {
            window.location.replace(redirectUrl);
          } else if (redirect) {
            redirect();
          }
        });
      }}
      redirectUri={LINKEDIN_REDIRECT_URI}
      redirectPath={LINKEDIN_REDIRECT_URI}
    />
  );
};

export const LoginForm = ({ redirect, eventKey }) => {
  return <BasicLoginForm redirect={redirect} eventKey={eventKey} />;
};

export const RegisterButton = props => {
  const [modal, setModal] = useToggle();
  const { next } = props;

  return (
    <>
      <div className="signup-button">
        <a href="#" className="btn-link" onClick={setModal}>
          Register with my Email Address
        </a>
      </div>
      <RegisterWithEmail next={next} isOpen={modal} toggle={setModal} />
    </>
  );
};

const AuthButtons = props => {
  const { children } = props;

  return (
    <>
      <div className="signup-buttons">{children}</div>
    </>
  );
};

export default AuthButtons;
