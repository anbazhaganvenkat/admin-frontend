import { apiClient } from "../apiClient";
import { toast } from "react-toastify";
import { endpoints } from "../configs";
import { fetchList } from "./table";

import {
  REQUEST_UPDATE_EXPERT_PROFILE_TAG,
  RECEIVE_UPDATE_EXPERT_PROFILE_TAG,
  EXPERT_PROFILE_TAG_UPDATE_ERROR
} from "../constants/ActionTypes";

/**
 * Request for updating expert profile tag
 */
export function requestUpdateExpertProfileTag() {
  return {
    type: REQUEST_UPDATE_EXPERT_PROFILE_TAG
  };
}

/**
 * Receive for updating expert profile tag
 */
export function receiveUpdateExpertProfileTag() {
  return {
    type: RECEIVE_UPDATE_EXPERT_PROFILE_TAG
  };
}

/**
 * Receive for error updating expert profile tag
 */
export function expertProfileTagUpdateError(error) {
  return {
    type: EXPERT_PROFILE_TAG_UPDATE_ERROR,
    error
  };
}

/**
 * Update expert profile tag
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateExpertProfileTag(id, data, params) {
  return dispatch => {
    dispatch(requestUpdateExpertProfileTag());
    apiClient
      .put(`${endpoints().expertProfileTagAPI}/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "expertProfileTags",
            `${endpoints().expertProfileTagAPI}`,
            1,
            10,
            params ? params : {}
          )
        );
        dispatch(receiveUpdateExpertProfileTag());
      })
      .catch(error => {
        dispatch(expertProfileTagUpdateError(error));

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
