import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import SVG from "react-inlinesvg";
import defaultLogo from "../../assets/logo.svg";
import { TORCHLITE_WEBSITE_URL } from "../../configs";

const Footer = (props) => {
  return (
    <footer className={["site-footer"].join(" ")}>
      <Container>
        <div
          className={[
            "footer-widgets",
            "d-flex",
            "justify-content-stretch",
          ].join(" ")}
        >
          <div className={["footer-widget"].join(" ")}>
            <a href={TORCHLITE_WEBSITE_URL} id={"footer-logo"}>
              <SVG src={defaultLogo} />
            </a>
            <p className="h6-5 text-inline-grayed">
              Torchlite helps marketers turn big ideas into wildly successful
              campaigns by showing them what to do, how to do it, and access to
              those who can get it done.
            </p>
          </div>

          <div className={["footer-widget"].join(" ")}>
            <nav>
              <dl>
                <dt>About</dt>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/about/`}>Company</a>
                </dd>
                <dd>
                  <a href={"#"}>Team</a>
                </dd>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/customers/`}>Customers</a>
                </dd>
                <dd>
                  <a href={"#"}>Careers</a>
                </dd>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/become-an-expert/`}>
                    Become a Torchliter
                  </a>
                </dd>
              </dl>
            </nav>
          </div>

          <div className={["footer-widget"].join(" ")}>
            <nav>
              <dl>
                <dt>Resources</dt>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/blog/`}>Blog</a>
                </dd>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/resources/?type=e-books`}>
                    eBooks
                  </a>
                </dd>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/resources/?type=webinars`}>
                    Webinars
                  </a>
                </dd>
                <dd>
                  <a
                    href={`${TORCHLITE_WEBSITE_URL}/resources/?type=case-studies`}
                  >
                    Case Studies
                  </a>
                </dd>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/resources/?type=press`}>
                    Press
                  </a>
                </dd>
              </dl>
            </nav>
          </div>

          <div className={["footer-widget"].join(" ")}>
            <nav>
              <dl>
                <dt>Partners</dt>
                <dd>
                  <a href={"#"}>Partner Program</a>
                </dd>
                <dd>
                  <a href={"#"}>API</a>
                </dd>
                <dd>
                  <a href={"#"}>Integrations</a>
                </dd>
              </dl>
            </nav>
          </div>

          <div className={["footer-widget"].join(" ")}>
            <nav>
              <dl>
                <dt>Help</dt>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/contact-us/`}>
                    Help Center
                  </a>
                </dd>
                <dd>
                  <a href={`${TORCHLITE_WEBSITE_URL}/terms-of-service/`}>
                    Terms of Service
                  </a>
                </dd>
                <dd>
                  <a href={"#"}>FAQ</a>
                </dd>
                <dd>
                  <Link to={"/login"}>Login</Link>
                </dd>
                <dd>
                  <Link to={"/customer-signup"}>Sign Up</Link>
                </dd>
              </dl>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
