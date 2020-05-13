import React, { Component } from "react";
import { Label, Input } from "reactstrap";

class CheckBox extends Component {
  render() {
    const { selectedOptions, options, name, title, handleChange } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {title}
        </label>
        <div className="checkbox" style={{ marginLeft: "25px" }}>
          {options.map(option => {
            return (
              <div>
                <Label key={option} className="checkbox-inline">
                  <Input
                    id={name}
                    name={name}
                    onChange={handleChange}
                    value={option}
                    checked={selectedOptions.indexOf(option) > -1}
                    type="checkbox"
                  />{" "}
                  <span className="checkbox-btn-label">{option}</span>
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CheckBox;
