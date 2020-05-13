import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { MoreIconVertical } from "../../assets/img/icons";

const MoreDropdown = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="dropdown-wrapper more-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle>
          <MoreIconVertical />
        </DropdownToggle>
        <DropdownMenu right>{props.children}</DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default MoreDropdown;
