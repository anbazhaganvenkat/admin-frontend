import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import detectBrowser from "./helpers/detectBrowser";

const Banner = props => {
  const [isMobile] = useState(detectBrowser());

  const {
    theme,
    title,
    subtitle,
    btn,
    background,
    classnames,
    textColor
  } = props;

  const styles = {
    backgroundColor: background.bgColor,
    backgroundImage: `url(${
      isMobile ? background.bgImageMobile : background.bgImage
    })`
  };

  const btnColor = {
    // backgroundColor: btn.buttonColor,
    color: textColor
  };

  const textColorStyles = {
    color: textColor
  };

  return (
    <section
      style={styles}
      className={`section banner banner-small ${classnames && classnames}`}
    >
      <Container>
        <div className="section-content d-flex justify-content-between align-items-center">
          <div className="title-wrapper" style={textColorStyles}>
            <span
              className={`h1 d-block font-weight-light text-center text-md-left ${
                !textColor ? `text-${theme}` : ""
              }`}
            >
              {title}
            </span>
            {subtitle && (
              <p className={`${!textColor ? `text-${theme}` : ""}`}>
                {subtitle}
              </p>
            )}
          </div>
          {/* /.title-wrapper */}
          <a
            href={btn.url ? btn.url : "Javascript:void(0);"}
            className={`btn btn-outline-${theme} font-weight-bold outline-bold`}
          >
            {btn.text}
          </a>
        </div>
        {/* /.section-content */}
      </Container>
    </section>
  );
};

Banner.propTypes = {
  theme: PropTypes.string,
  title: PropTypes.string,
  btn: PropTypes.object,
  background: PropTypes.object,
  classnames: PropTypes.string
};

export default Banner;
