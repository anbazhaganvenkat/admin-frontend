import { apiClient } from "../apiClient";
import { toast } from "react-toastify";
import { endpoints } from "../configs";
import { fetchList } from "./table";
import history from "../history";

import {
  REQUEST_CREATE_LANDING_PAGE_BLOCK,
  RECEIVE_CREATE_LANDING_PAGE_BLOCK,
  LANDING_PAGE_BLOCK_CREATE_ERROR,
  REQUEST_DELETE_LANDING_PAGE_BLOCK,
  RECEIVE_DELETE_LANDING_PAGE_BLOCK,
  LANDING_PAGE_BLOCK_DELETE_ERROR,
  REQUEST_UPDATE_LANDING_PAGE_BLOCK,
  RECEIVE_UPDATE_LANDING_PAGE_BLOCK,
  LANDING_PAGE_BLOCK_UPDATE_ERROR
} from "../constants/ActionTypes";

/**
 * Request for creating landing page
 */
export function requestCreateLandingPageBlock() {
  return {
    type: REQUEST_CREATE_LANDING_PAGE_BLOCK
  };
}

/**
 * Receive for creating landing page
 */
export function receiveCreateLandingPageBlock() {
  return {
    type: RECEIVE_CREATE_LANDING_PAGE_BLOCK
  };
}

/**
 * Receive for error creating landing page
 */
export function landingPageBlockCreateError(error) {
  return {
    type: LANDING_PAGE_BLOCK_CREATE_ERROR,
    error
  };
}

/**
 * Create landing page
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addLandingPageBlock(data, landingPageId) {
  return dispatch => {
    dispatch(requestCreateLandingPageBlock());

    return apiClient
      .post(`${endpoints().landingPageBlocksAPI}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList(
            "landingPageBlocks",
            `${endpoints().landingPageBlocksAPI}`,
            1,
            10,
            { landingPageId: landingPageId }
          )
        );
        dispatch(receiveCreateLandingPageBlock());
      })
      .catch(error => {
        dispatch(landingPageBlockCreateError(error));

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
 * Request for updating landing page
 */
export function requestUpdateLandingPageBlock() {
  return {
    type: REQUEST_UPDATE_LANDING_PAGE_BLOCK
  };
}

/**
 * Receive for updating landing page
 */
export function receiveUpdateLandingPageBlock() {
  return {
    type: RECEIVE_UPDATE_LANDING_PAGE_BLOCK
  };
}

/**
 * Receive for error updating landing page
 */
export function landingPageBlockUpdateError(error) {
  return {
    type: LANDING_PAGE_BLOCK_UPDATE_ERROR,
    error
  };
}

/**
 * Update landing page details
 *
 * @param id
 * @param data
 * @returns {function(...[*]=)}
 */
export function updateLandingPageBlock(id, data, landingPageId) {
  return dispatch => {
    dispatch(requestUpdateLandingPageBlock());
    apiClient
      .put(`${endpoints().landingPageBlocksAPI}/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
        history.push(`/landing-page/edit/${landingPageId}`);
      })
      .catch(error => {
        dispatch(landingPageBlockUpdateError(error));

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
 * Request for deleting landing page
 */
export function requestDeleteLandingPageBlock() {
  return {
    type: REQUEST_DELETE_LANDING_PAGE_BLOCK
  };
}

/**
 * Receive for deleting landing page
 */
export function receiveDeleteLandingPageBlock() {
  return {
    type: RECEIVE_DELETE_LANDING_PAGE_BLOCK
  };
}

/**
 * Receive for error deleting landing page
 */
export function landingPageBlockDeleteError(error) {
  return {
    type: LANDING_PAGE_BLOCK_DELETE_ERROR,
    error
  };
}

/**
 * Delete landing page
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteLandingPageBlock(id, landingPageId) {
  return dispatch => {
    dispatch(requestDeleteLandingPageBlock());

    apiClient
      .delete(`${endpoints().landingPageBlocksAPI}/${id}`)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        history.push(`/landing-page/edit/${landingPageId}`);
      })
      .then(() => {
        dispatch(
          fetchList(
            "landingPageBlocks",
            `${endpoints().landingPageBlocksAPI}`,
            1,
            10,
            { landingPageId: landingPageId }
          )
        );
        dispatch(receiveDeleteLandingPageBlock());
      })
      .catch(error => {
        dispatch(landingPageBlockDeleteError(error));

        let errorMessage;
        const errorRequest = error.response.request;
        if (errorRequest && errorRequest.response) {
          errorMessage = JSON.parse(errorRequest.response).message;
        }
        toast.error(errorMessage);
        console.error(errorMessage);
      });
  };
}
