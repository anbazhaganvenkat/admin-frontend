import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";

class RadioButton extends React.Component {
  validate(value) {
    const { label, placeholder, required, error } = this.props;

    let errorMessage;
    const inputLabel = label || placeholder;
    const errorMessageLabel = error;

    if ((!value || !value.trim()) && required) {
      errorMessage = errorMessageLabel
        ? `${errorMessageLabel}`
        : `${inputLabel} is required`;
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, values } }) {
    const {
      name,
      id,
      label,
      notify,
      options,
      onRender,
      className
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    const fieldInput = (
      <FormGroup
        className={className}
        style={{ marginBottom: 22, position: "relative" }}
      >
        {label && (
          <Label id={inputId} notify={notify}>
            <span style={{ fontWeight: "lighter" }}>{label}</span>
          </Label>
        )}

        <div className="pb-3" />

        {options.map((option, key) => (
          <FormGroup
            key={key}
            style={{ display: "block", paddingLeft: "-1.25em !important" }}
          >
            <Label check className="radio-item">
              <Input
                type="radio"
                {...field}
                name={inputId}
                defaultChecked={field.value === option}
                value={option}
                className="radio-button"
              />
              <p className="" style={{ fontSize: "16px", fontWeight: "500" }}>
                {option}
              </p>
            </Label>
          </FormGroup>
        ))}

        {errorMessage && (
          <FormFeedback style={{ marginTop: 1, display: "block" }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );

    if (!onRender) {
      return fieldInput;
    }

    return onRender(values, (err, render) => (render ? fieldInput : null));
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

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  )
};

export default RadioButton;
