import React from "react";
import { Field, getIn } from "formik";
import { FormFeedback } from "reactstrap";

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return (
        <FormFeedback style={{ position: "absolute" }}>
          {touch && error ? error : null}
        </FormFeedback>
      );
    }}
  />
);

export default ErrorMessage;
