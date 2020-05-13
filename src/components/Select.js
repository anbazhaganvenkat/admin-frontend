import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, FormFeedback } from "reactstrap";
import ReactSelect from "react-select";
import Label from "./Label";

class Select extends React.Component {
  validate(value) {
    const { label, placeholder, required } = this.props;

    let errorMessage;
    let inputLabel = label || placeholder;

    if (!value && required) {
      errorMessage = `${inputLabel} is required`;
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue, values } }) {
    const {
      name,
      id,
      label,
      placeholder,
      options,
      isLoading,
      onOpen,
      onSearch,
      onInputChange,
      notify,
      onRender
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    let placeholderText;
    if (placeholder) {
      placeholderText = placeholder;
    } else if (label) {
      placeholderText = `Select ${label}`;
    }

    const fieldSelect = (
      <FormGroup style={{ marginBottom: 22, position: "relative" }}>
        {label && (
          <Label id={inputId} notify={notify}>
            {label}
          </Label>
        )}
        <ReactSelect
          defaultValue={field.value && field.value.value ? field.value : null}
          value={field.value && field.value.value ? field.value : null}
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          options={options}
          isLoading={isLoading}
          onMenuOpen={() => onOpen && onOpen()}
          placeholder={placeholderText}
          onChange={value => {
            setFieldValue(name, value);
            if (onInputChange) {
              values[name] = value;
              onInputChange({ setFieldValue, values });
            }
          }}
          onBlur={() => field.onBlur({ target: { name } })}
          onInputChange={value => onSearch && onSearch(value)}
          styles={{
            control: (provided, state) => {
              let boxShadow;
              let borderColor = errorMessage
                ? "#f86c6b !important"
                : provided.borderColor;
              if (state.isFocused) {
                boxShadow = errorMessage
                  ? "0 0 0 0.2rem rgba(248, 108, 107, 0.25)"
                  : "0 0 0 0.2rem rgba(32, 168, 216, 0.25)";
                borderColor = errorMessage ? borderColor : "#8ad4ee !important";
              }
              return Object.assign({}, provided, {
                borderColor,
                boxShadow
              });
            }
          }}
        />

        <span
          className={`d-none form-control ${errorMessage ? "is-invalid" : ""}`}
        />

        {errorMessage && (
          <FormFeedback style={{ position: "absolute", marginTop: 1 }}>
            {errorMessage}
          </FormFeedback>
        )}
      </FormGroup>
    );

    if (!onRender) {
      return fieldSelect;
    }

    return onRender(values, (err, render) => (render ? fieldSelect : null));
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

Select.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  ),
  onOpen: PropTypes.func,
  onSearch: PropTypes.func,
  onInputChange: PropTypes.func
};

export default Select;
