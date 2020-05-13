import {
  REQUEST_CREATE_EXPERT_AVAILABILITY_UPDATE,
  RECEIVE_CREATE_EXPERT_AVAILABILITY_UPDATE,
  EXPERT_AVAILABILITY_UPDATE_CREATE_ERROR
} from "../constants/ActionTypes";

export function expertAvailabilityReducer(
  state = {
    isCreating: false
  },
  action
) {
  switch (action.type) {
    // Request create expert availability update
    case REQUEST_CREATE_EXPERT_AVAILABILITY_UPDATE:
      return Object.assign({}, state, {
        isCreating: true
      });
    // Receive create expert availability update
    case RECEIVE_CREATE_EXPERT_AVAILABILITY_UPDATE:
    // Employee create expert availability update fails
    case EXPERT_AVAILABILITY_UPDATE_CREATE_ERROR: {
      return Object.assign({}, state, {
        isCreating: false
      });
    }
    default:
      return state;
  }
}
