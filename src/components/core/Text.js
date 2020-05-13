import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import {
  FormGroup,
  Input,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Label from "./Label";
import RenderInputGroup from "./RenderInputGroup";

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

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

  renderInput({ field, form: { touched, errors, setFieldValue } }) {
    const {
      name,
      id,
      label,
      placeholder,
      notify,
      onChange,
      type,
      maxLength,
      showCharCount,
      defaultValue,
      addonText,
      addonType,
      error,
      onKeyDown,
      onClick
    } = this.props;

    let errorMessage = touched[name] && errors[name] ? errors[name] : null;
    if (error) {
      errorMessage = error;
    }

    const inputId = id || name;

    const countInputChars = () => {
      if (this.state.inputValue !== undefined) {
        return this.state.inputValue.length;
      }
      return 0;
    };

    const setInputValue = e => {
      const { value } = e.target;
      this.setState({
        inputValue: value
      });
    };

    return (
      <FormGroup
        style={{ position: "relative" }}
        className={(!!errorMessage && "is-invalid") || ""}
      >
        {label && (
          <Label id={inputId} notify={notify}>
            {label}
          </Label>
        )}
        <RenderInputGroup
          condition={addonText !== null && addonText !== undefined}
          wrapper={children => <InputGroup>{children}</InputGroup>}
        >
          {addonText && (
            <InputGroupAddon addonType={addonType}>
              <InputGroupText>{addonText}</InputGroupText>
            </InputGroupAddon>
          )}
          <Input
            id={inputId}
            {...field}
            type={type ? type : "text"}
            placeholder={placeholder || label}
            invalid={!!errorMessage}
            defaultValue={defaultValue}
            style={{
              background: "#F3F3F4",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              height: "40px"
            }}
            onKeyUp={e => {
              setInputValue(e);
              onChange && onChange(e);
            }}
            onValueChange={value => {
              setFieldValue(name, value.value);
            }}
            onKeyDown={onKeyDown}
            maxLength={maxLength && maxLength ? maxLength : "50"}
            onClick={onClick && onClick}
          />
        </RenderInputGroup>
        {showCharCount && (
          <span className="char-count d-block text-inline-grayed h7">
            {`${countInputChars()}/${maxLength ? maxLength : "255"} Characters`}
          </span>
        )}

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

Text.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.any,
  addonText: PropTypes.string,
  addonType: PropTypes.oneOf(["prepend", "append"])
};

export default Text;
