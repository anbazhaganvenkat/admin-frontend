import { apiClient } from "../apiClient";
import { toast } from "react-toastify";
import { endpoints } from "../configs";
import { fetchList } from "./table";

import {
  REQUEST_UPDATE_EXPERT,
  RECEIVE_UPDATE_EXPERT,
  EXPERT_UPDATE_ERROR
} from "../constants/ActionTypes";

/**
 * Request for updating Expert
 */
export function requestUpdateExpert() {
  return {
    type: REQUEST_UPDATE_EXPERT
  };
}

/**
 * Receive for updating Expert
 */
export function receiveUpdateExpert() {
  return {
    type: RECEIVE_UPDATE_EXPERT
  };
}

/**
 * Receive for error updating Expert
 */
export function expertUpdateError(error) {
  return {
    type: EXPERT_UPDATE_ERROR,
    error
  };
}

/**
 * Update Expert
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateExpert(id, data, params) {
  return dispatch => {
    dispatch(requestUpdateExpert());
    apiClient
      .put(`${endpoints().expertAPI}/status/approve/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "pendingExperts",
            `${endpoints().expertAPI}/search`,
            1,
            10,
            params ? params : {}
          )
        );
        dispatch(
          fetchList(
            "approvedExperts",
            `${endpoints().expertAPI}/search`,
            1,
            10,
            {
              marketplaceStatus: "Approved"
            }
          )
        );
        dispatch(receiveUpdateExpert());
      })
      .catch(error => {
        dispatch(expertUpdateError(error));

        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(error.response.data.message);
          console.error(errorMessage);
        }
      });
  };
}
