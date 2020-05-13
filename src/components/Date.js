import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import Label from "./Label";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/date.css";

class DateInput extends React.Component {
  validate(value) {
    const { label, placeholder, required } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;

    if ((!value || !value.trim()) && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue } }) {
    const { name, id, label, placeholder, format, notify } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    return (
      <FormGroup style={{ marginBottom: 22, position: "relative" }}>
        {label && (
          <Label id={inputId} notify={notify}>
            {label}
          </Label>
        )}

        <DatePicker
          name="endDate"
          id={inputId}
          className={`form-control ${errorMessage ? "is-invalid" : ""}`}
          onChange={value => {
            setFieldValue(name, moment(value).format("YYYY-MM-DD"));
          }}
          dateFormat={format || "dd MMM, yyyy"}
          selected={field.value ? new Date(field.value) : null}
          placeholderText={placeholder || label}
        />

        {errorMessage && (
          <FormFeedback
            style={{ position: "absolute", marginTop: 1, display: "block" }}
          >
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

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  required: PropTypes.bool
};

export default DateInput;
