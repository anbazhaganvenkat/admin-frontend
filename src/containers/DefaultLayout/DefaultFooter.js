import React, { Component } from "react";
import { getCurrentYear } from "../../lib/helper";
import { TORCHLITE_WEBSITE_URL } from "../../configs";

class DefaultFooter extends Component {
  render() {
    return (
      <div className="footer p-3">
        <div className="container">
          <div className="row">
            <div className="col mx-auto text-left">
              <span>
                &copy; {getCurrentYear()}
                <a
                  href={"#"}
                  className="ml-2"
                  target="_blank"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  admin
                </a>
                . All rights reserved.
              </span>
            </div>
            <div className="col-lg-3 col-sm">
              <div>
                <a href="#">
                  <i
                    className="fa fa-facebook-official fa-2x pr-3"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                </a>
                <a href="#">
                  <i
                    className="fa fa-twitter fa-2x pr-3"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                </a>
                <a href="#">
                  <i
                    className="fa fa-instagram fa-2x pr-3"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                </a>
                <i
                  className="fa fa-youtube-play fa-2x pr-3"
                  aria-hidden="true"
                  style={{ color: "white" }}
                ></i>
                <a href="#">
                  <i
                    className="fa fa-linkedin-square fa-2x pr-3"
                    aria-hidden="true"
                    style={{ color: "white" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultFooter;
