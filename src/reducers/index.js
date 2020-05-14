import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as form } from "redux-form";

// Reducer
import table from "./table";
import { dashboardReducer } from "./dashboardReducer";

const appReducer = combineReducers({
  routing: routerReducer,
  form,
  table,
  dashboard: dashboardReducer
});

const rootReducer = (state, action) => {
  if (action.type === "UNAUTH_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
