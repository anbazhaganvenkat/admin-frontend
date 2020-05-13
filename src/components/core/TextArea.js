import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };

    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      inputValue: this.textareaRef.current.props.value
    });
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

  renderInput({ field, form: { touched, errors } }) {
    const {
      name,
      id,
      label,
      placeholder,
      notify,
      rows,
      onChange,
      defaultValue,
      maxLength,
      showCharCount
    } = this.props;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    const countInputChars = () => {
      if (this.state.inputValue) {
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
      <FormGroup style={{ position: "relative" }}>
        {label && (
          <Label id={inputId} notify={notify}>
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          {...field}
          type="textarea"
          placeholder={placeholder || label}
          invalid={!!errorMessage}
          rows={rows}
          onKeyUp={e => {
            setInputValue(e);
            onChange && onChange(e);
          }}
          defaultValue={defaultValue}
          style={{
            background: "#F3F3F4",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            height: 92
          }}
          maxLength={maxLength && maxLength ? maxLength : "255"}
          ref={this.textareaRef}
        />
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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.string
};

export default TextArea;
