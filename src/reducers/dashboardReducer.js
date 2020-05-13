import {
  REQUEST_DASHBOARD_COUNT,
  RECEIVE_DASHBOARD_COUNT,
  FETCH_DASHBOARDD_COUNT_FAIL
} from "../constants/ActionTypes";

export function dashboardReducer(
  state = {
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_DASHBOARD_COUNT:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_DASHBOARD_COUNT: {
      return Object.assign({}, state, { isFetching: false }, action.payload);
    }
    case FETCH_DASHBOARDD_COUNT_FAIL: {
      return { ...state, isFetching: false };
    }
    default:
      return state;
  }
}
