import React from "react";
import propTypes from "prop-types";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

class StatisticsCountCard extends React.Component {
  render() {
    const { count, label, prefix, redirectUrl } = this.props;

    return (
      <Link
        className="card-statistic text-center text-decoration-none"
        to={redirectUrl || "#"}
        style={{ cursor: "pointer", color: "inherit" }}
      >
        <h2>
          <CountUp
            separator=","
            start={0}
            end={count}
            duration={3}
            prefix={prefix}
          />
        </h2>
        <h6>{label}</h6>
      </Link>
    );
  }
}

StatisticsCountCard.propTypes = {
  count: propTypes.number.isRequired,
  label: propTypes.string.isRequired,
  prefix: propTypes.string
};

export default StatisticsCountCard;
