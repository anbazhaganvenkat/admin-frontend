import React, { useState } from "react";
import detectBrowser from "./helpers/detectBrowser";

const BigCta = ({
  isMobile,
  bgImageMobile,
  bgImage,
  overlayColor,
  ctaUrl,
  ctaLabel,
  textColor
}) => (
  <a href={ctaUrl ? ctaUrl : "Javascript:void(0);"} className="advisor-link">
    <span
      className="background-holder"
      style={{
        backgroundImage: `url(${isMobile ? bgImageMobile : bgImage})`
      }}
    />
    <span
      className="overlay"
      style={{
        backgroundColor: overlayColor,
        opacity: 0.9
      }}
    >
      <span className="h1 font-weight-light" style={{ color: textColor }}>
        {ctaLabel}
      </span>
    </span>
  </a>
);

const MarketplaceAdvisor = props => {
  const { requestToBecomeAnAdvisor } = props;
  const [isMobile] = useState(detectBrowser());

  return (
    <section className={["section", "section-xsmall"].join(" ")}>
      <div className="container">
        <div className="content-wrapper">
          <div className="row">
            {requestToBecomeAnAdvisor && (
              <div
                className={`col-md-6 ${
                  requestToBecomeAnAdvisor && !requestToBecomeAnAdvisor
                    ? "justify-content-center mx-auto"
                    : ""
                }`}
              >
                <BigCta
                  bgImage={requestToBecomeAnAdvisor.backgroundImageDesktopUrl}
                  bgImageMobile={
                    requestToBecomeAnAdvisor.backgroundImageMobileUrl
                  }
                  textColor={requestToBecomeAnAdvisor.textColor}
                  overlayColor={requestToBecomeAnAdvisor.backgroundColor}
                  ismobile={isMobile}
                  ctaUrl={requestToBecomeAnAdvisor.link}
                  ctaLabel={requestToBecomeAnAdvisor.title}
                />
              </div>
            )}

            {requestToBecomeAnAdvisor && (
              <div
                className={`col-md-6 ${
                  requestToBecomeAnAdvisor && !requestToBecomeAnAdvisor.title1
                    ? "justify-content-center mx-auto"
                    : ""
                }`}
              >
                <BigCta
                  bgImage={requestToBecomeAnAdvisor.backgroundImageDesktopUrl1}
                  bgImageMobile={
                    requestToBecomeAnAdvisor.backgroundImageMobileUrl1
                  }
                  overlayColor={requestToBecomeAnAdvisor.backgroundColor1}
                  textColor={requestToBecomeAnAdvisor.textColor1}
                  ismobile={isMobile}
                  ctaUrl={requestToBecomeAnAdvisor.link1}
                  ctaLabel={requestToBecomeAnAdvisor.title1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceAdvisor;
