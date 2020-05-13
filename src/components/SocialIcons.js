import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faDribbble,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import iconGlobe from "../assets/img/icons/icon-globe.svg";

class SocialIcons extends React.Component {
  render() {
    const {
      facebook,
      twitter,
      linkedIn,
      dribbble,
      instagram,
      www,
      className
    } = this.props;

    if (!facebook && !twitter && !linkedIn) {
      return null;
    }

    const socialIcons = [];
    if (facebook) {
      socialIcons.push({
        icon: faFacebook,
        color: "#292934",
        href: facebook
      });
    }

    if (twitter) {
      socialIcons.push({
        icon: faTwitter,
        color: "#292934",
        href: twitter
      });
    }

    if (linkedIn) {
      socialIcons.push({
        icon: faLinkedin,
        color: "#292934",
        href: linkedIn
      });
    }

    if (instagram) {
      socialIcons.push({
        icon: faInstagram,
        color: "#292934",
        href: instagram
      });
    }

    if (dribbble) {
      socialIcons.push({
        icon: faDribbble,
        color: "#292934",
        href: dribbble
      });
    }

    if (www) {
      socialIcons.push({
        icon: iconGlobe,
        color: "#292934",
        href: www
      });
    }

    return (
      <div className={className || ""}>
        {socialIcons.map((socialIcon, key) => (
          <div
            key={key}
            className="float-left"
            style={{
              fontSize: 24,
              paddingLeft: 6,
              paddingRight: 6,
              paddingTop: 0,
              paddingBottom: 0
            }}
          >
            <a
              href={socialIcon.href}
              style={{ color: socialIcon.color }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {typeof socialIcon.icon === "object" ? (
                <FontAwesomeIcon icon={socialIcon.icon} />
              ) : (
                <SVG src={socialIcon.icon} />
              )}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

SocialIcons.propTypes = {
  className: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  linkedIn: PropTypes.string
};

export default SocialIcons;
