import React from "react";
import { isCustomer, isExpert, isSuperAdmin } from "../../lib/helper";

// Components
import StatisticsCountCard from "../../components/StatisticsCountCard";

const DashboardStatisticCards = props => {
  const {
    userCount
  } = props;

  return (
    <div className={"card-statistics"}>
      <StatisticsCountCard
          count={userCount}
          label="User"
          redirectUrl="/users"
      />
    </div>
  );
};
export default DashboardStatisticCards;
