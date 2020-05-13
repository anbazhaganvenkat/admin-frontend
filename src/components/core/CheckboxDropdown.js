import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Input
} from "reactstrap";
import {
  CheckboxOffIcon,
  CheckboxOnIconAlt,
  ChevronDown
} from "../../assets/img/icons";

const CheckboxDropdown = props => {
  const [checkedItems, setCheckedItems] = useState({}); //plain object as state
  const [didMount, setDidMount] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const {
    dropdownLabel,
    dropdownLinks,
    menuPosition,
    onClick,
    color,
    hideCaret,
    hideChevron,
    selectName,
    getSelectedFilters,
    liveFilters
  } = props;

  const handleChange = event => {
    // updating an object instead of a Map
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
  };

  useEffect(() => setDidMount(true), []);

  useEffect(() => {
    if (didMount) {
      getSelectedFilters({ selectedValue: filterCheckedItems() }, selectName);
    }
  }, [checkedItems]);

  const filterCheckedItems = () =>
    Object.keys(checkedItems).filter(item => checkedItems[item] === true);

  const filteredDropdownLinkList = () =>
    dropdownLinks.filter(listItem => listItem.placeholder === undefined);

  return (
    <div className="dropdown-wrapper select-dropdown checkbox-dropdown align-items-center justify-content-end">
      {dropdownLabel && (
        <p className="font-weight-bold mb-0 mr-2">{dropdownLabel}</p>
      )}
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          color={color}
          className={`dropdown-toggle ${hideCaret ? "hide-caret" : ""}`}
        >
          {liveFilters[selectName] !== undefined ? (
            liveFilters[selectName].selectedValue.length < 1 ? (
              <span>{dropdownLinks[0].label}</span>
            ) : (
              <>
                <span>{liveFilters[selectName].selectedValue[0]}</span>
                {liveFilters[selectName].selectedValue.length > 1 && (
                  <>
                    <span className="d-inline">{` `},</span>
                    <span>{` +${liveFilters[selectName].selectedValue.length -
                      1} more`}</span>
                  </>
                )}
              </>
            )
          ) : (
            <span>{dropdownLinks[0].label}</span>
          )}

          {/*{filterCheckedItems().length < 1 ? (*/}
          {/*  <span>{dropdownLinks[0].label}</span>*/}
          {/*) : (*/}
          {/*  <>*/}
          {/*    {filterCheckedItems()[0]}*/}
          {/*    {filterCheckedItems().length > 1 && (*/}
          {/*      <>*/}
          {/*        <span className="d-inline">{` `},</span>*/}
          {/*        {` +${filterCheckedItems().length - 1} more`}*/}
          {/*      </>*/}
          {/*    )}*/}
          {/*  </>*/}
          {/*)}*/}
          {!hideChevron && <ChevronDown />}
        </DropdownToggle>
        <DropdownMenu right={menuPosition}>
          {filteredDropdownLinkList().map(listItem => (
            <div className="checkbox-wrapper" key={listItem.value}>
              <label
                htmlFor={listItem.value
                  .toString()
                  .toLowerCase()
                  .split(" ")
                  .join("")}
              >
                <Input
                  type="checkbox"
                  name={listItem.value}
                  id={listItem.value
                    .trim()
                    .toString()
                    .toLowerCase()
                    .split(" ")
                    .join("")}
                  onChange={handleChange}
                  checked={checkedItems[listItem.value]}
                  value={checkedItems[listItem.value]}
                />
                <span
                  className={`checkbox-placeholder ${checkedItems[
                    listItem.value
                  ] && "active"}`}
                />
                {listItem.label}
              </label>
            </div>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

CheckboxDropdown.defaultProps = {
  buttonLabel: "Button Label",
  color: "",
  hideCaret: false,
  dropdownLinks: [
    { label: "Link 1", value: "link1" },
    { label: "Link 2", value: "link2" },
    { label: "Link 3", value: "link3" }
  ],
  menuPosition: true
};

CheckboxDropdown.propTypes = {
  buttonLabel: PropTypes.string,
  color: PropTypes.string,
  hideCaret: PropTypes.bool,
  dropdownLinks: PropTypes.array,
  menuPosition: PropTypes.bool,
  onClick: PropTypes.func
};

export default CheckboxDropdown;
