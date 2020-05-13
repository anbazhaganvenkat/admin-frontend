import {
  REQUEST_LANDING_PAGE_DETAIL,
  RECEIVE_LANDING_PAGE_DETAIL,
  FETCH_LANDING_PAGE_DETAIL_FAIL
} from "../constants/ActionTypes";

export function landingPageReducer(
  state = {
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_LANDING_PAGE_DETAIL:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_LANDING_PAGE_DETAIL: {
      return Object.assign({}, state, { isFetching: false }, action.payload);
    }
    case FETCH_LANDING_PAGE_DETAIL_FAIL: {
      return { ...state, isFetching: false };
    }
    default:
      return state;
  }
}
