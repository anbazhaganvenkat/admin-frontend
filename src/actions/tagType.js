import {
  REQUEST_DELETE_TAG_TYPE,
  RECEIVE_DELETE_TAG_TYPE,
  TAG_TYPE_DELETE_ERROR,
  REQUEST_CREATE_TAG_TYPE,
  RECEIVE_CREATE_TAG_TYPE,
  TAG_TYPE_CREATE_ERROR,
  REQUEST_UPDATE_TAG_TYPE,
  RECEIVE_UPDATE_TAG_TYPE,
  TAG_TYPE_UPDATE_ERROR
} from "../constants/ActionTypes";
import { apiClient } from "../apiClient";
import { endpoints } from "../configs";
import { toast } from "react-toastify";
import { fetchList } from "./table";

/**
 * Request for deleting tag type
 */
export function requestDeleteTagType() {
  return {
    type: REQUEST_DELETE_TAG_TYPE
  };
}

/**
 * Receive for deleting tag type
 */
export function receiveDeleteTagType() {
  return {
    type: RECEIVE_DELETE_TAG_TYPE
  };
}

/**
 * Receive for error deleting tag type
 */
export function tagTypeDeleteError(error) {
  return {
    type: TAG_TYPE_DELETE_ERROR,
    error
  };
}

/**
 * Delete tag type
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteTagType(id) {
  return dispatch => {
    dispatch(requestDeleteTagType());

    apiClient
      .delete(`${endpoints().tagTypeAPI}/${id}`)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(fetchList("tagTypes", `${endpoints().tagTypeAPI}`, 1, 10));
      })
      .catch(error => {
        dispatch(tagTypeDeleteError(error));
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
 * Request for creating tag type
 */
export function requestCreateTagType() {
  return {
    type: REQUEST_CREATE_TAG_TYPE
  };
}

/**
 * Receive for receive tag type
 */
export function receiveCreateTagType() {
  return {
    type: RECEIVE_CREATE_TAG_TYPE
  };
}

/**
 * Receive for error creating tag type
 */
export function TagTypeCreateError(error) {
  return {
    type: TAG_TYPE_CREATE_ERROR,
    error
  };
}

/**
 * Create tag type
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addTagType(data) {
  return dispatch => {
    dispatch(requestCreateTagType());

    return apiClient
      .post(`${endpoints().tagTypeAPI}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(fetchList("tagTypes", `${endpoints().tagTypeAPI}`, 1, 10));
        dispatch(receiveCreateTagType());
      })
      .catch(error => {
        dispatch(TagTypeCreateError(error));

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
 * Request for updating tag type
 */
export function requestUpdateTagType() {
  return {
    type: REQUEST_UPDATE_TAG_TYPE
  };
}

/**
 * Receive for updating tag type
 */
export function receiveUpdateTagType() {
  return {
    type: RECEIVE_UPDATE_TAG_TYPE
  };
}

/**
 * Receive for error updating tag type
 */
export function TagTypeUpdateError(error) {
  return {
    type: TAG_TYPE_UPDATE_ERROR,
    error
  };
}

/**
 * Update tag type details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateTagType(id, data) {
  return dispatch => {
    dispatch(requestUpdateTagType());
    apiClient
      .put(`${endpoints().tagTypeAPI}/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(fetchList("tagTypes", `${endpoints().tagTypeAPI}`, 1, 10));
      })
      .catch(error => {
        dispatch(TagTypeUpdateError(error));

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
