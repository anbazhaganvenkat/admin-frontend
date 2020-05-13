import { apiClient } from "../apiClient";
import { toast } from "react-toastify";
import { endpoints } from "../configs";
import { fetchList } from "./table";

import {
  REQUEST_UPDATE_PROJECT,
  RECEIVE_UPDATE_PROJECT,
  PROJECT_UPDATE_ERROR
} from "../constants/ActionTypes";

/**
 * Request for updating Project
 */
export function requestUpdateProject() {
  return {
    type: REQUEST_UPDATE_PROJECT
  };
}

/**
 * Receive for updating Project
 */
export function receiveUpdateProject() {
  return {
    type: RECEIVE_UPDATE_PROJECT
  };
}

/**
 * Receive for error updating Project
 */
export function projectUpdateError(error) {
  return {
    type: PROJECT_UPDATE_ERROR,
    error
  };
}

/**
 * Update Project
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateProject(id, data, params) {
  return dispatch => {
    dispatch(requestUpdateProject());
    apiClient
      .put(`${endpoints().projectAPI}/status/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "projectList",
            `${endpoints().projectAPI}`,
            1,
            10,
            params ? params : {}
          )
        );
        dispatch(receiveUpdateProject());
      })
      .catch(error => {
        dispatch(projectUpdateError(error));

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
