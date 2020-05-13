import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";

const ContentCards = props => {
  const { classnames, children } = props;

  return (
    <section className={`section content-cards ${classnames && classnames}`}>
      <Container>
        <div className="section-content">
          <div className="content-wrapper">
            <div className="row">{children}</div>
          </div>
        </div>
        {/* /.section-content */}
      </Container>
    </section>
  );
};

ContentCards.propTypes = {
  classnames: PropTypes.string
};

export default ContentCards;
