import { apiClient } from "../apiClient";
import { toast } from "react-toastify";
import { endpoints } from "../configs";
import { fetchList } from "./table";

import {
  REQUEST_CREATE_NEW_USER,
  RECEIVE_CREATE_NEW_USER,
  NEW_USER_CREATE_ERROR,
} from "../constants/ActionTypes";

/**
 * Request for creating new user
 */
export function requestCreateNewUser() {
  return {
    type: REQUEST_CREATE_NEW_USER,
  };
}

/**
 * Receive for creating new user
 */
export function receiveCreateNewUser() {
  return {
    type: RECEIVE_CREATE_NEW_USER,
  };
}

/**
 * Receive for error creating new user
 */
export function newUserCreateError(error) {
  return {
    type: NEW_USER_CREATE_ERROR,
    error,
  };
}

/**
 * Create New User
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export function addNewUser(data) {
  return (dispatch) => {
    dispatch(requestCreateNewUser());

    return apiClient
      .post(endpoints().userAPI, data)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }
      })
      .then(() => {
        dispatch(
          fetchList("users", `${endpoints().userAPI}`, 1, 10, {
            search: "",
            sort: "",
            sortDir: "",
            pagination: true,
          })
        );
        //dispatch(fetchList("Super Admin", `${endpoints().userAPI}`, 1, 10));
        dispatch(receiveCreateNewUser());
      })
      .catch((error) => {
        dispatch(newUserCreateError(error));

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
