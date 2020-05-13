import React, { Component } from "react";
import { Label, Input } from "reactstrap";

// Assets
import checkBoxOff from "../../assets/img/icons/icon-checkbox-off.svg";
import checkBoxOn from "../../assets/img/icons/icon-checkbox-on.svg";

class CheckboxCart extends Component {
  render() {
    const {
      selectedOptions,
      options,
      name,
      title,
      handleChange,
      classnames
    } = this.props;
    return (
      <div className={`form-group ${classnames}`}>
        {title && (
          <label htmlFor={name} className="form-label">
            {title}
          </label>
        )}
        <div className="checkbox">
          {options.map(option => {
            return (
              <div
                key={option.option}
                className="d-flex justify-content-between align-items-center mb-4"
              >
                <div className="input-wrapper d-flex align-items-center">
                  <Label className="m-0 d-flex">
                    <Input
                      id={option.option}
                      name={option.option}
                      onChange={handleChange}
                      value={option.option}
                      checked={selectedOptions.indexOf(option.option) > -1}
                      type="checkbox"
                    />{" "}
                    <span className="checkbox-placeholder mr-1">
                      {selectedOptions.filter(s => s === option.option).length >
                      0 ? (
                        <img src={checkBoxOn} alt="" />
                      ) : (
                        <img src={checkBoxOff} alt="" />
                      )}
                    </span>
                  </Label>
                  <span className="checkbox-btn-label h7">{option.option}</span>
                </div>
                <span className="price">${option.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CheckboxCart;
