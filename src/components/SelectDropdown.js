import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown
} from "reactstrap";
import { ChevronDown } from "../assets/img/icons";

const SelectDropdown = props => {
  const [selectedValue, setSelectedValue] = useState({});
  const [dropdownOpen, setOpen] = useState(false);
  const [didMount, setDidMount] = useState(false);
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
    liveFilters,
    nlFormFilter,
    handleChange
  } = props;

  useEffect(() => setDidMount(true), []);

  useEffect(() => {
    if (didMount && nlFormFilter) {
      getSelectedFilters(selectedValue, selectName);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (didMount && nlFormFilter) {
      if (liveFilters[selectName] !== undefined) {
        setSelectedValue({
          selectedValue: [...liveFilters[selectName].selectedValue]
        });
      }
    }
  }, []);

  const updateLabel = e => {
    setSelectedValue({ selectedValue: [e.target.dataset["label"]] });
  };

  return (
    <div className="dropdown-wrapper select-dropdown align-items-center justify-content-end">
      {dropdownLabel && (
        <p className="font-weight-bold mb-0 mr-2">{dropdownLabel}</p>
      )}
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          color={color}
          className={`dropdown-toggle ${hideCaret ? "hide-caret" : ""}`}
        >
          {Object.values(selectedValue)[0] !== undefined &&
          Object.values(selectedValue)[0].length > 0
            ? Object.values(selectedValue)[0]
            : props.buttonLabel}
          {!hideChevron && <ChevronDown />}
        </DropdownToggle>
        <DropdownMenu right={menuPosition}>
          {dropdownLinks
            .filter(listItem => listItem.placeholder === undefined)
            .map(listItem => (
              <DropdownItem
                onClick={e => {
                  updateLabel(e);
                  handleChange && handleChange(e.target.dataset["label"]);
                }}
                data-value={listItem.value}
                data-label={listItem.label}
                data-name={selectName}
                key={listItem.value}
                id={listItem.value}
              >
                {listItem.label}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

SelectDropdown.defaultProps = {
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

SelectDropdown.propTypes = {
  buttonLabel: PropTypes.string,
  color: PropTypes.string,
  hideCaret: PropTypes.bool,
  dropdownLinks: PropTypes.array,
  menuPosition: PropTypes.bool,
  onClick: PropTypes.func,
  selectName: PropTypes.string.isRequired,
  getSelectedFilters: PropTypes.func
};

export default SelectDropdown;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
