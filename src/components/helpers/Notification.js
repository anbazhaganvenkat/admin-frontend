import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Notification extends React.Component {
  static success(message) {
    toast.success(message);
  }

  static error(message) {
    toast.error(message);
  }

  render() {
    return <ToastContainer />;
  }
}
