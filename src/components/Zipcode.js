import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import isPostalCode from "validator/lib/isPostalCode";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";

class Zipcode extends React.Component {
  validate(value) {
    const { label, placeholder, required, locale } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;

    if ((!value || !value.trim()) && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    } else if (value && !isPostalCode(value, locale || "US")) {
      errorMessage = inputLabel ? `Invalid ${inputLabel}` : "Invalid";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors } }) {
    const { name, id, label, placeholder, error, notify } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error) {
      errorMessage = error;
    }
    const inputId = id || name;

    return (
      <FormGroup style={{ marginBottom: 22, position: "relative" }}>
        {label && (
          <Label id={inputId} notify={notify}>
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          {...field}
          type="text"
          placeholder={placeholder || label}
          invalid={!!errorMessage}
        />

        {errorMessage && (
          <FormFeedback style={{ position: "absolute", marginTop: 1 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );
  }

  render() {
    const { name } = this.props;

    return (
      <Field
        validate={this.validate.bind(this)}
        name={name}
        render={this.renderInput.bind(this)}
      />
    );
  }
}

Zipcode.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  locale: PropTypes.string
};

export default Zipcode;
