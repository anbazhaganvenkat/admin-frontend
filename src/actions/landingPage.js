import { apiClient } from "../apiClient";
import { toast } from "react-toastify";
import { endpoints } from "../configs";
import { fetchList } from "./table";

import {
  REQUEST_LANDING_PAGE_DETAIL,
  RECEIVE_LANDING_PAGE_DETAIL,
  FETCH_LANDING_PAGE_DETAIL_FAIL,
  REQUEST_CREATE_LANDING_PAGE,
  RECEIVE_CREATE_LANDING_PAGE,
  LANDING_PAGE_CREATE_ERROR,
  REQUEST_DELETE_LANDING_PAGE,
  RECEIVE_DELETE_LANDING_PAGE,
  LANDING_PAGE_DELETE_ERROR,
  REQUEST_UPDATE_LANDING_PAGE,
  RECEIVE_UPDATE_LANDING_PAGE,
  LANDING_PAGE_UPDATE_ERROR
} from "../constants/ActionTypes";
import { receiveCreateLandingPageBlock } from "./landingPageBlock";

function requestLandingPageDetail() {
  return { type: REQUEST_LANDING_PAGE_DETAIL };
}

function receiveLandingPageDetail(payload) {
  return { type: RECEIVE_LANDING_PAGE_DETAIL, payload };
}

function fetchLandingPageDetailFail(error) {
  return { type: FETCH_LANDING_PAGE_DETAIL_FAIL, error };
}

export function fetchLandingPageDetail(id) {
  return dispatch => {
    dispatch(requestLandingPageDetail());

    return apiClient
      .get(`/v1/landingPage/${id}`)
      .then(() => {
        dispatch(
          fetchList(
            "landingPageBlocks",
            `${endpoints().landingPageBlocksAPI}`,
            1,
            10,
            { landingPageId: id }
          )
        );
        dispatch(receiveCreateLandingPageBlock());
      })
      .then(response => dispatch(receiveLandingPageDetail(response.data)))
      .catch(error => {
        dispatch(fetchLandingPageDetailFail(error));

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
 * Request for creating landing page
 */
export function requestCreateLandingPage() {
  return {
    type: REQUEST_CREATE_LANDING_PAGE
  };
}

/**
 * Receive for creating landing page
 */
export function receiveCreateLandingPage() {
  return {
    type: RECEIVE_CREATE_LANDING_PAGE
  };
}

/**
 * Receive for error creating landing page
 */
export function landingPageCreateError(error) {
  return {
    type: LANDING_PAGE_CREATE_ERROR,
    error
  };
}

/**
 * Create landing page
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addLandingPage(data) {
  return dispatch => {
    dispatch(requestCreateLandingPage());

    return apiClient
      .post(`${endpoints().landingPageAPI}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList("landingPage", `${endpoints().landingPageAPI}`, 1, 10)
        );
        dispatch(receiveCreateLandingPage());
      })
      .catch(error => {
        dispatch(landingPageCreateError(error));

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
export function requestUpdateLandingPage() {
  return {
    type: REQUEST_UPDATE_LANDING_PAGE
  };
}

/**
 * Receive for updating landing page
 */
export function receiveUpdateLandingPage() {
  return {
    type: RECEIVE_UPDATE_LANDING_PAGE
  };
}

/**
 * Receive for error updating landing page
 */
export function landingPageUpdateError(error) {
  return {
    type: LANDING_PAGE_UPDATE_ERROR,
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
export function updateLandingPage(id, data) {
  return dispatch => {
    dispatch(requestUpdateLandingPage());
    apiClient
      .put(`${endpoints().landingPageAPI}/${id}`, data)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList("landingPage", `${endpoints().landingPageAPI}`, 1, 10)
        );
        dispatch(receiveUpdateLandingPage());
      })
      .catch(error => {
        dispatch(landingPageUpdateError(error));

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
export function requestDeleteLandingPage() {
  return {
    type: REQUEST_DELETE_LANDING_PAGE
  };
}

/**
 * Receive for deleting landing page
 */
export function receiveDeleteLandingPage() {
  return {
    type: RECEIVE_DELETE_LANDING_PAGE
  };
}

/**
 * Receive for error deleting landing page
 */
export function landingPageDeleteError(error) {
  return {
    type: LANDING_PAGE_DELETE_ERROR,
    error
  };
}

/**
 * Delete landing page
 *
 * @param id
 * @returns {function(*): *}
 */
export function deleteLandingPage(id) {
  return dispatch => {
    dispatch(requestDeleteLandingPage());

    apiClient
      .delete(`${endpoints().landingPageAPI}/${id}`)
      .then(response => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList("landingPage", `${endpoints().landingPageAPI}`, 1, 10)
        );
      })
      .catch(error => {
        dispatch(landingPageDeleteError(error));

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
