import { apiClient } from "../apiClient";
import { endpoints } from "../configs";
import { toast } from "react-toastify";
import { fetchList } from "./table";
import {
  PROJECT_CATEGORY_CREATE_ERROR,
  RECEIVE_CREATE_PROJECT_CATEGORY,
  REQUEST_CREATE_PROJECT_CATEGORY,
  PROJECT_CATEGORY_UPDATE_ERROR,
  RECEIVE_UPDATE_PROJECT_CATEGORY,
  REQUEST_UPDATE_PROJECT_CATEGORY,
  REQUEST_DELETE_PROJECT_CATEGORY,
  RECEIVE_DELETE_PROJECT_CATEGORY,
  PROJECT_CATEGORY_DELETE_ERROR
} from "../constants/ActionTypes";

/**
 * Request for creating project category
 */
export function requestCreateProjectCategory() {
  return {
    type: REQUEST_CREATE_PROJECT_CATEGORY
  };
}

/**
 * Receive for receive project category
 */
export function receiveCreateProjectCategory() {
  return {
    type: RECEIVE_CREATE_PROJECT_CATEGORY
  };
}

/**
 * Receive for error creating project category
 */
export function projectCategoryCreateError(error) {
  return {
    type: PROJECT_CATEGORY_CREATE_ERROR,
    error
  };
}

/**
 * Create project category
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addProjectCategory(data) {
  return dispatch => {
    dispatch(requestCreateProjectCategory());

    return apiClient
      .post(`${endpoints().projectCategoryAPI}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "projectCategory",
            `${endpoints().projectCategoryAPI}`,
            1,
            10
          )
        );
        dispatch(receiveCreateProjectCategory());
      })
      .catch(error => {
        dispatch(projectCategoryCreateError(error));

        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          toast.error(errorMessage);
          console.error(errorMessage);
        }
      });
  };
}

/**
 * Request for updating project category
 */
export function requestUpdateProjectCategory() {
  return {
    type: REQUEST_UPDATE_PROJECT_CATEGORY
  };
}

/**
 * Receive for updating project category
 */
export function receiveUpdateProjectCategory() {
  return {
    type: RECEIVE_UPDATE_PROJECT_CATEGORY
  };
}

/**
 * Receive for error updating project category
 */
export function projectCategoryUpdateError(error) {
  return {
    type: PROJECT_CATEGORY_UPDATE_ERROR,
    error
  };
}

/**
 * Update project category details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateProjectCategory(id, data) {
  return dispatch => {
    dispatch(requestUpdateProjectCategory());
    apiClient
      .put(`${endpoints().projectCategoryAPI}/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "projectCategory",
            `${endpoints().projectCategoryAPI}`,
            1,
            10
          )
        );
      })
      .catch(error => {
        dispatch(projectCategoryUpdateError(error));

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

/**
 * Request for deleting project category
 */
export function requestDeleteProjectCategory() {
  return {
    type: REQUEST_DELETE_PROJECT_CATEGORY
  };
}

/**
 * Receive for deleting project category
 */
export function receiveDeleteProjectCategory() {
  return {
    type: RECEIVE_DELETE_PROJECT_CATEGORY
  };
}

/**
 * Receive for error deleting project category
 */
export function projectCategoryDeleteError(error) {
  return {
    type: PROJECT_CATEGORY_DELETE_ERROR,
    error
  };
}

/**
 * Delete tag type
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteProjectCategory(id) {
  return dispatch => {
    dispatch(requestDeleteProjectCategory());

    apiClient
      .delete(`${endpoints().projectCategoryAPI}/${id}`)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "projectCategory",
            `${endpoints().projectCategoryAPI}`,
            1,
            10
          )
        );
      })
      .catch(error => {
        dispatch(projectCategoryDeleteError(error));
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
