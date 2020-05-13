import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown
} from "reactstrap";
import { ChevronDown } from "../../assets/img/icons";

const PrimaryDropdown = props => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const { buttonLabel, dropdownLinks, menuPosition, onClick } = props;

  return (
    <div className="dropdown-wrapper">
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="primary" className="dropdown-toggle">
          {buttonLabel}
        </DropdownToggle>
        <DropdownMenu right={menuPosition}>
          {dropdownLinks.map(listItem => (
            <DropdownItem
              onClick={onClick}
              data-value={listItem.value}
              data-label={listItem.label}
              key={listItem.value}
            >
              {listItem.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

PrimaryDropdown.defaultProps = {
  buttonLabel: "Button Label",
  dropdownLinks: [
    { label: "Link 1", value: "link1" },
    { label: "Link 2", value: "link2" },
    { label: "Link 3", value: "link3" }
  ],
  menuPosition: true,
  onClick: () => {
    console.log("button clicked");
  }
};

PrimaryDropdown.propTypes = {
  buttonLabel: PropTypes.string,
  dropdownLinks: PropTypes.array,
  menuPosition: PropTypes.bool,
  onClick: PropTypes.func
};

export default PrimaryDropdown;
