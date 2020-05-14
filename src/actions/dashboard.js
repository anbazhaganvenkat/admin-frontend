import { apiClient } from "../apiClient";

import {
  REQUEST_DASHBOARD_COUNT,
  RECEIVE_DASHBOARD_COUNT,
  FETCH_DASHBOARDD_COUNT_FAIL
} from "../constants/ActionTypes";
import { toast } from "react-toastify";
import { endpoints } from "../configs";

function requestDashboardCount() {
  return { type: REQUEST_DASHBOARD_COUNT };
}

function receiveDashboardCount(payload) {
  return { type: RECEIVE_DASHBOARD_COUNT, payload };
}

function fetchDashboardCountFail(error) {
  return { type: FETCH_DASHBOARDD_COUNT_FAIL, error };
}

export function fetchDashboardCount() {
  return dispatch => {
    dispatch(requestDashboardCount());

    return apiClient
      .get(`${endpoints().dashboardAPI}/admin/count`)
      .then(response => {
        const data = response.data;
        isExpert() &&
          apiClient
            .get(`${endpoints().dashboardAPI}/expert/customer/count`)
            .then(response => {
              data.customerCount = response.data.customerCount;
              return dispatch(receiveDashboardCount(data));
            })
            .catch(error => {
              if (error.response && error.response.status >= 400) {
                let errorMessage;
                const errorRequest = error.response.request;
                if (errorRequest && errorRequest.response) {
                  errorMessage = JSON.parse(errorRequest.response).message;
                }
                toast.error(errorMessage);
              }
            });
        return dispatch(receiveDashboardCount(data));
      })
      .catch(error => {
        dispatch(fetchDashboardCountFail(error));

        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
        }
      });
  };
}
