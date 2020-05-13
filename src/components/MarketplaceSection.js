import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

const MarketplaceSection = props => {
  const { title, subtitle, classnames, children, author } = props;

  return (
    <section className={`section ${classnames && classnames}`}>
      <Container>
        <div className="section-content">
          <div className="section-title">
            <span className="h1 d-block font-weight-light">{title}</span>
            {subtitle && <p>{subtitle}</p>}
            {author && <span className="author h7 text-dark">{author}</span>}
          </div>
          {/* /.section-title */}
          <div className="content-wrapper">
            <div className="row">{children}</div>
          </div>
        </div>
        {/* /.section-content */}
      </Container>
    </section>
  );
};

MarketplaceSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  author: PropTypes.string,
  classnames: PropTypes.string
};

export default MarketplaceSection;
