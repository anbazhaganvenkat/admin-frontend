import React, { Component } from "react";
import _ from "lodash";

class LinkedInLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null
    };
  }
  componentDidMount() {
    window.addEventListener("message", this.handlePostMessage);
  }

  handlePostMessage = event => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      alert(`Login successful: ${event.data.profile.localizedFirstName}`);
    }
  };

  updateProfile = profile => {
    console.log(profile);
    this.setState({
      isAuthorized: true,
      firstName: _.get(profile, "localizedFirstName", ""),
      lastName: _.get(profile, "localizedLastName", ""),
      profileURL: `https://www.linkedin.com/in/${_.get(
        profile,
        "vanityName",
        ""
      )}`,
      pictureURL: _.get(
        _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
      )
    });
  };

  requestProfile = e => {
    e.preventDefault();

    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86sj7pyc2q40tw&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:51945/find-an-expert`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.requestProfile}>Linkedin Login</button>
        {this.state.isAuthorized && (
          <div className="profile">
            <div className="profile-container">
              <img
                src={this.state.pictureURL}
                alt=""
                height="200px"
                width="200px"
              />
              <h1>
                <a href={this.state.profileURL} target="_blank">
                  {this.state.firstName} {this.state.lastName}
                </a>
              </h1>
              <h2>{this.props.headline}</h2>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LinkedInLogin;
