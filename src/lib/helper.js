import moment from "moment";

/**
 * To String
 *
 * @param {*} value
 */
export function toString(value) {
  return value ? value : null;
}

/**
 * Is LoggedIn user
 *
 * @param name
 */
export function isLoggedIn(name) {
  const currentPath = window.location.pathname + window.location.search;
  let redirectUrl = "";
  if (currentPath) {
    redirectUrl = `?redirect=${currentPath}`;
  }

  if (!getCookie("session_token")) {
    // if session_token is null redirect login
    window.location.replace(`/login${redirectUrl}`);
  }
}

/**
 * Check logged in status
 *
 * @returns boolean
 */
export function getLoggedInStatus() {
  return getCookie("session_token");
}

/**
 * Get Url Parameter

 * @param name
 */
export function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : name === "email"
    ? decodeURIComponent(results[1])
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Get Url Parameter

 * @param password
 */
export function getpassword(password) {
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  let data;
  if (password.match(strongRegex)) {
    data = true;
  } else {
    data = false;
  }
  return data;
}

/**
 * Strong Password validation
 *
 * @param password
 * @returns error
 */
export function validateStrongPassword(password) {
  let error;

  if (password && password.length < 8) {
    error = "Must be at least 8 characters";
  } else if (
    password &&
    password.length >= 8 &&
    getpassword(password) !== true
  ) {
    error = "Please choose stronger password";
  }

  return error;
}

/**
 * From Array
 *
 * @param values
 * @returns {string}
 */
export function fromArray(values) {
  const arrayData = [];
  if (values && values.length > 0) {
    values.forEach((value) => {
      arrayData.push({ tagId: value.value });
    });
  }

  return arrayData ? arrayData : "";
}

/**
 *
 * Get Full name by first name and last name
 * @param {*} first_name
 * @param {*} last_name
 */
export function getFullName(first_name, last_name) {
  let name = [];
  if (first_name) {
    name.push(first_name);
  }
  if (last_name) {
    name.push(last_name);
  }

  return name.join(" ");
}

/**
 * Get Current Year
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Get Formatted Today dd/mm/yyyy
 */
export function getFormattedTodayDate() {
  return moment().format("ll");
}

/**
 * Get params by name
 */
export function getParamsByName(e) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(e);
}

/**
 * Remove params by name
 */
export function removeParamsByName(name) {
  const search = window.location.search;
  const params = new URLSearchParams(search.slice(1));
  return params.delete(name);
}

/**
 * Remove phone mask
 * @param {*} phoneNumber
 */
export function removeMaskedPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/[^0-9]/g, "");
}

/**
 *  Excerpt text
 *  @param {*} string
 */
export function excerptText(str = "", strLength = 0) {
  return `${str.slice(0, strLength)} ${
    str.length - 3 > strLength ? "..." : ""
  }`;
}

/**
 * Get Cookie
 *
 * @param cname
 * @returns {string}
 */
export function getCookie(cname) {
  var nameEQ = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return "";
}

/**
 * Set Cookie
 *
 * @param cookieName
 * @param cookieValue
 * @param days
 */
export function setCookie(cookieName, cookieValue, days = 30) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
}

/**
 * Clear Cookie
 *
 * @param name
 */
export function clearCookie(name) {
  setCookie(name, "", -24);
}

/**
 * Mask Phone Number
 *
 * @param phone number
 */
export function maskPhoneNumber(phoneNumber) {
  const num = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
    3,
    6
  )}-${phoneNumber.substring(6, phoneNumber.length)}`;
  return num;
}

/**
 * Switch expert badge colors
 * @param cases
 * @returns {string}
 */

export const setExpertBadge = (cases) => {
  let standardized = cases.toLowerCase();
  switch (standardized) {
    case "waiting":
      return "warning";
    case "interested":
      return "success";
    case "not interested":
      return "danger";
    case "no response":
      return "secondary";
    default:
      return "secondary";
  }
};
