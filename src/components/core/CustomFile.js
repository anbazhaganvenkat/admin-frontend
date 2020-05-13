import React, { useState } from "react";
import Label from "./Label";
import { FormFeedback, FormGroup } from "reactstrap";

const CustomFile = props => {
  const {
    name,
    id,
    label,
    notify,
    onChange,
    className,
    errorMessage,
    setFieldValue
  } = props;
  let [updatedLabelText, setUpdatedLabelText] = useState("");
  const updateLabel = e => {
    setUpdatedLabelText(e.target.value);
  };
  const inputId = id || name;
  return (
    <FormGroup className={className}>
      {label && (
        <Label id={inputId} notify={notify}>
          <span>{updatedLabelText || label}</span>
        </Label>
      )}
      <input
        id={inputId}
        type="file"
        onChange={e => {
          updateLabel(e);
          onChange && onChange(e);
        }}
      />

      {errorMessage && (
        <FormFeedback style={{ position: "absolute", marginTop: 1 }}>
          {errorMessage}
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default CustomFile;
