import React from "react";
import { withRouter } from "react-router-dom";

const GoBack = ({ history }) => (
  <img src="./images/back.png" onClick={() => history.goBack()} alt="Go back" />
);

export default withRouter(GoBack);
