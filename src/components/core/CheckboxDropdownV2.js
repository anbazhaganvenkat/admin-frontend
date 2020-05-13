import React, { Component, useEffect, useState } from "react";
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

class CheckboxDropdown2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: {},
      didMount: false,
      dropdownOpen: false
    };
  }

  toggle = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

  handleChange = event => {
    this.setState(
      {
        checkedItems: {
          ...this.state.checkedItems,
          [event.target.name]: event.target.checked
        }
      },
      () => {
        this.props.getSelectedFilters(
          { selectedValue: this.filterCheckedItems() },
          this.props.selectName
        );
      }
    );
  };

  filterCheckedItems = () =>
    Object.keys(this.state.checkedItems).filter(
      item => this.state.checkedItems[item] === true
    );

  filteredDropdownLinkList = () =>
    this.props.dropdownLinks.filter(
      listItem => listItem.placeholder === undefined
    );

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.checkedItems !== prevState.checkedItems) {
    } else {
      if (this.props.liveFilters[this.props.selectName] !== undefined) {
        const obj = {};
        for (const key of this.props.liveFilters[this.props.selectName]
          .selectedValue) {
          obj[key] = true;
        }
        this.setState({
          checkedItems: obj
        });
      }
    }
  }

  render() {
    const {
      dropdownLabel,
      dropdownLinks,
      menuPosition,
      onClick,
      color,
      hideCaret,
      hideChevron,
      selectName,
      liveFilters
    } = this.props;

    const { dropdownOpen, checkedItems } = this.state;

    return (
      <div className="dropdown-wrapper select-dropdown checkbox-dropdown align-items-center justify-content-end">
        {dropdownLabel && (
          <p className="font-weight-bold mb-0 mr-2">{dropdownLabel}</p>
        )}
        <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
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

            {!hideChevron && <ChevronDown />}
          </DropdownToggle>
          <DropdownMenu right={menuPosition}>
            {this.filteredDropdownLinkList().map(listItem => (
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
                    onChange={this.handleChange}
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
  }
}

CheckboxDropdown2.defaultProps = {
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

CheckboxDropdown2.propTypes = {
  buttonLabel: PropTypes.string,
  color: PropTypes.string,
  hideCaret: PropTypes.bool,
  dropdownLinks: PropTypes.array,
  menuPosition: PropTypes.bool,
  onClick: PropTypes.func
};

export default CheckboxDropdown2;
