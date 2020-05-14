import React, { useEffect, useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  NavLink,
} from "reactstrap";
import Avatar from "../Avatar";
import { getCookie, clearCookie } from "../../lib/helper";
import { Link } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { endpoints } from "../../configs";
import history from "../../history";
import { UserIcon } from "../../assets/img/icons";

function logoutUser() {
  apiClient.defaults.headers.common.Authorization = null;
  clearCookie("session_token");
  clearCookie("role");
  clearCookie("userId");
  history.push("/login");
}

const UserNavDropdown = (props) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState(null);
  const [expertId, setExpertId] = useState(null);

  // Set session token
  const token = getCookie("session_token");

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const userLoggedIn =
    getCookie("userId") !== undefined && getCookie("userId") !== "";

  const _getUserDetails = () =>
    userLoggedIn &&
    apiClient
      .get(`${endpoints().userAPI}`)
      .then((response) => {
        let successMessage;
        if (response && response.data) {
          successMessage = response.data.message;
        }

        const { id, firstName, lastName, avatarUrl, expertId } = response.data;

        setFirstName(firstName);
        setLastName(lastName);
        setAvatarUrl(avatarUrl);
        setExpertId(expertId);
        setIsLoading(false);
        setUserId(id);
      })
      .catch((error) => {
        if (error.response && error.response.status >= 400) {
          let errorMessage;
          const errorRequest = error.response.request;
          if (errorRequest && errorRequest.response) {
            errorMessage = JSON.parse(errorRequest.response).message;
          }
          console.error(errorMessage);
        }
      });

  useEffect(() => {
    _getUserDetails();
  }, [isLoading]);

  return (
    <div className="dropdown-wrapper ml-auto">
      {userLoggedIn ? (
        <UncontrolledDropdown inNavbar>
          <DropdownToggle nav className="p-0">
            {token && !isLoading && (
              <Avatar
                firstName={firstName}
                lastName={lastName}
                size="xs"
                fontSize={12}
                url={avatarUrl}
              />
            )}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={"li"} className={"edit-profile-item"}>
              {token && (
                <Avatar
                  firstName={firstName}
                  lastName={lastName}
                  size="customSize"
                  imageSize={"50"}
                  url={avatarUrl}
                />
              )}
              <div className="edit-profile-actions">
                <div className="edit-profile-name">
                  <strong>
                    {firstName} {lastName}
                  </strong>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem divider />
            <Link
              to=""
              onClick={() => logoutUser()}
              className="edit-profile-logout text-danger"
              style={{ textDecoration: "none" }}
            >
              <DropdownItem>Sign Out</DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserNavDropdown;
