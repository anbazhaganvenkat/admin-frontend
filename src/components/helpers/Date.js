import React from "react";
import moment from "moment";

export default class Date extends React.Component {
  static format(date, format = "MMM DD, YYYY") {
    if (!date) {
      return null;
    }
    return moment(date).format(format);
  }

  render() {
    return null;
  }
}
