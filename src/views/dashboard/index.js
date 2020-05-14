import React from "react";
import DashboardStatisticsCards from "./DashboardStatisticsCards";
import {getCookie, getUrlParameter} from "../../lib/helper";
import { apiClient } from "../../apiClient";
// Configs
import { endpoints } from "../../configs";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0
    };
  }

  componentWillMount() {
   this.getUserCount();
  }

  getUserCount() {
    return apiClient
        .get(`${endpoints().userAPI}`)
        .then(response => {
          if (response && response.data) {
            this.setState({
              totalCount: response.data.totalCount
            });
          }
        })
        .catch(error => {
          if (error.response && error.response.status >= 400) {
            let errorMessage;
            const errorRequest = error.response.request;
            if (errorRequest && errorRequest.response) {
              errorMessage = JSON.parse(errorRequest.response).message;
            }
            console.error(errorMessage);
          }
        });

  }


  render() {
    return (
        <DashboardStatisticsCards
              userCount={this.state.totalCount}
          />
    )
  }
};

export default Dashboard;
