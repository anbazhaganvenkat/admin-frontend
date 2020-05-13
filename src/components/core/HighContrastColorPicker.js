import React from "react";
import { Input } from "reactstrap";
import Label from "./Label";

const HighContrastColorPicker = ({
  handleSelect,
  selectedColor = "#fff",
  inputName
}) => {
  return (
    <>
      <div className={["contrast-color-picker", "form-wrapper"].join(" ")}>
        <Label
          className={["contrast-color", "text-light", "bg-dark"].join(" ")}
        >
          <Input
            type="radio"
            name={inputName || "radio_field_name"}
            defaultChecked={selectedColor === "#fff"}
            className="radio-button"
            value={"#fff"}
            onClick={e => handleSelect(e)}
          />
          <p className="d-flex align-items-center justify-content-start">
            <span className="radio-placeholder" />
          </p>
          <span className={["d-block"].join(" ")}>Light Color</span>
        </Label>

        <Label
          className={["contrast-color", "text-dark", "bg-light"].join(" ")}
        >
          <Input
            type="radio"
            name={inputName || "radio_field_name"}
            className="radio-button"
            value={"#111"}
            defaultChecked={selectedColor === "#111"}
            onClick={e => handleSelect(e)}
          />
          <p className="d-flex align-items-center justify-content-start">
            <span className="radio-placeholder" />
          </p>
          <span className={["d-block"].join(" ")}>Dark Color</span>
        </Label>
      </div>
    </>
  );
};

export default HighContrastColorPicker;
