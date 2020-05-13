import { apiClient } from "../apiClient";
import history from "../history";
import { endpoints, DEFAULT_API_KEY } from "../configs";

import {
  REQUEST_CREATE_EXPERT_AVAILABILITY_UPDATE,
  RECEIVE_CREATE_EXPERT_AVAILABILITY_UPDATE,
  EXPERT_AVAILABILITY_UPDATE_CREATE_ERROR
} from "../constants/ActionTypes";
import { toast } from "react-toastify";

/** Add expert availability update **/

/**
 * Request for expert availability update create
 */
export function requestCreateExpertAvailabilityUpdate() {
  return {
    type: REQUEST_CREATE_EXPERT_AVAILABILITY_UPDATE
  };
}

/**
 * receive for expert availability update create
 */
export function receiveCreateExpertAvailabilityUpdate() {
  return {
    type: RECEIVE_CREATE_EXPERT_AVAILABILITY_UPDATE
  };
}

/**
 * Expert availability update create fails
 */
export function expertAvailabilityUpdateCreateError(error) {
  return {
    type: EXPERT_AVAILABILITY_UPDATE_CREATE_ERROR,
    error
  };
}

/**
 * Expert availability update create
 */
export function expertAvailabilityUpdate(details) {
  return dispatch => {
    dispatch(requestCreateExpertAvailabilityUpdate());

    apiClient.defaults.headers.common.Authorization = DEFAULT_API_KEY;
    return apiClient
      .post(endpoints().expertAvailabilityUpdate, details)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
        toast.success(successMessage, {
          hideProgressBar: false
        });

        dispatch();
        history.push("/expert-availability");
      })
      .then(() => {
        dispatch(receiveCreateExpertAvailabilityUpdate());
      })
      .catch(error => {
        dispatch(expertAvailabilityUpdateCreateError(error));
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
