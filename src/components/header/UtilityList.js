import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import {
  SearchIcon,
  FavoritesIcon,
  HelpIcon,
  NotificationIcon
} from "../../assets/img/icons";

const UtilityList = props => {
  return (
    <>
      <Nav className="utility-list align-items-center">
        {/*<NavItem>*/}
        {/*  <NavLink href="#">*/}
        {/*    <SearchIcon />*/}
        {/*  </NavLink>*/}
        {/*</NavItem>*/}
        {/*<NavItem>*/}
        {/*  <NavLink href="#">*/}
        {/*    <FavoritesIcon />*/}
        {/*  </NavLink>*/}
        {/*</NavItem>*/}
        <NavItem>
          <NavLink href="/help">
            <HelpIcon />
          </NavLink>
        </NavItem>
        {/*<NavItem>*/}
        {/*  <NavLink href="#">*/}
        {/*    <NotificationIcon />*/}
        {/*  </NavLink>*/}
        {/*</NavItem>*/}
      </Nav>
    </>
  );
};

export default UtilityList;
