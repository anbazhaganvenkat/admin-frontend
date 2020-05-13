import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import NumberFormat from "react-number-format";
import Label from "./Label";

class Currency extends React.Component {
  validate(value) {
    const { label, placeholder, required } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;

    if ((!value || !value.trim()) && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue, values } }) {
    const {
      name,
      id,
      label,
      placeholder,
      notify,
      onChange,
      defaultValue,
      className,
      maxLength
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    return (
      <FormGroup style={{ marginBottom: 22, position: "relative" }}>
        {label && (
          <Label id={inputId} notify={notify}>
            {label}
          </Label>
        )}

        {(defaultValue || field.value) && (
          <span
            style={{
              position: "absolute",
              top: "42px",
              left: "10px",
              fontSize: "14px",
              zIndex: "2"
            }}
          >
            $
          </span>
        )}

        <NumberFormat
          defaultValue={defaultValue || field.value}
          value={field.value}
          id={inputId}
          {...field}
          placeholder={placeholder || label}
          className={`${className} form-control ${
            errorMessage ? "is-invalid" : ""
          }`}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: "40px",
            paddingLeft: "20px"
          }}
          onValueChange={value => {
            setFieldValue(name, value.value);
          }}
          onKeyUp={onChange}
          maxLength={maxLength ? maxLength : 6}
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

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

export default Currency;
