import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import Label from "./Label";
import NumberFormat from "react-number-format";

// Helper
import isPostalCode from "validator/lib/isPostalCode";

class Zipcode extends React.Component {
  validate(value) {
    const { label, placeholder, required, locale } = this.props;
    let errorMessage;
    let inputLabel = label || placeholder;

    if ((!value || !value.trim()) && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    } else if (value && !isPostalCode(value.trim(), locale || "US")) {
      errorMessage = inputLabel ? `Invalid ${inputLabel}` : "Invalid";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors } }) {
    const {
      name,
      id,
      label,
      placeholder,
      error,
      notify,
      onKeyDown
    } = this.props;

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
        <NumberFormat
          defaultValue={field.value}
          decimalSeparator={false}
          allowNegative={false}
          value={field.value}
          id={inputId}
          {...field}
          placeholder={placeholder || label}
          maxLength="5"
          className={`form-control ${errorMessage ? "is-invalid" : ""}`}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: "40px"
          }}
          onKeyDown={onKeyDown}
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
