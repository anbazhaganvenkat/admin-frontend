import {
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
  TAG_DELETE_ERROR,
  REQUEST_CREATE_TAG,
  RECEIVE_CREATE_TAG,
  TAG_CREATE_ERROR,
  REQUEST_UPDATE_TAG,
  RECEIVE_UPDATE_TAG,
  TAG_UPDATE_ERROR
} from "../constants/ActionTypes";
import { apiClient } from "../apiClient";
import { endpoints } from "../configs";
import { toast } from "react-toastify";
import { fetchList } from "./table";

/**
 * Request for deleting tag
 */
export function requestDeleteTag() {
  return {
    type: REQUEST_DELETE_TAG
  };
}

/**
 * Receive for deleting tag
 */
export function receiveDeleteTag() {
  return {
    type: RECEIVE_DELETE_TAG
  };
}

/**
 * Receive for error deleting tag
 */
export function tagDeleteError(error) {
  return {
    type: TAG_DELETE_ERROR,
    error
  };
}

/**
 * Delete tag
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteTag(id) {
  return dispatch => {
    dispatch(requestDeleteTag());

    apiClient
      .delete(`${endpoints().tagAPI}/${id}`)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(fetchList("tags", `${endpoints().tagAPI}`, 1, 10));
      })
      .catch(error => {
        dispatch(tagDeleteError(error));
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

/**
 * Request for creating tag
 */
export function requestCreateTag() {
  return {
    type: REQUEST_CREATE_TAG
  };
}

/**
 * Receive for receive tag
 */
export function receiveCreateTag() {
  return {
    type: RECEIVE_CREATE_TAG
  };
}

/**
 * Receive for error creating tag
 */
export function TagCreateError(error) {
  return {
    type: TAG_CREATE_ERROR,
    error
  };
}

/**
 * Create tag
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addTag(data) {
  return dispatch => {
    dispatch(requestCreateTag());

    return apiClient
      .post(`${endpoints().tagAPI}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(fetchList("tags", `${endpoints().tagAPI}`, 1, 10));
        dispatch(receiveCreateTag());
      })
      .catch(error => {
        dispatch(TagCreateError(error));

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
 * Request for updating tag
 */
export function requestUpdateTag() {
  return {
    type: REQUEST_UPDATE_TAG
  };
}

/**
 * Receive for updating tag
 */
export function receiveUpdateTag() {
  return {
    type: RECEIVE_UPDATE_TAG
  };
}

/**
 * Receive for error updating tag
 */
export function TagUpdateError(error) {
  return {
    type: TAG_UPDATE_ERROR,
    error
  };
}

/**
 * Update tag details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateTag(id, data) {
  return dispatch => {
    dispatch(requestUpdateTag());
    apiClient
      .put(`${endpoints().tagAPI}/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(fetchList("tags", `${endpoints().tagAPI}`, 1, 10));
      })
      .catch(error => {
        dispatch(TagUpdateError(error));

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
