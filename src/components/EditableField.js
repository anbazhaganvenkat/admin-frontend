import React, { useState } from "react";
import { Input } from "reactstrap";

const EditableField = ({
  editEnabled,
  fieldLabel,
  fieldName,
  onSubmit,
  updateTaskName,
  taskIndex
}) => {
  const [fieldValue, setFieldValue] = useState(fieldLabel);

  if (editEnabled) {
    return (
      <Input
        value={fieldValue}
        name={fieldName}
        onChange={e => setFieldValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            setFieldValue(e.target.value);
            updateTaskName(taskIndex, fieldValue);
            onSubmit();
          }
        }}
        style={{ maxWidth: "200px" }}
      />
    );
  } else {
    return <h5>{fieldValue}</h5>;
  }
};

export default EditableField;
