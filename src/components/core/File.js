import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import Label from "./Label";

class File extends React.Component {
  state = {
    updatedLabelText: null
  };
  validate(value) {
    const { label, required } = this.props;

    let errorMessage;
    let inputLabel = label;

    if ((!value || !value.trim()) && required) {
      errorMessage = inputLabel ? `${inputLabel} is required` : "Required";
    }

    return errorMessage;
  }

  renderInput({ field, form: { touched, errors, setFieldValue } }) {
    const { name, id, label, notify, onChange, className } = this.props;
    const { updatedLabelText } = this.state;

    const errorMessage = touched[name] && errors[name] ? errors[name] : null;
    const inputId = id || name;

    const updateLabel = e => {
      this.setState({
        updatedLabelText: e.target.value
      });
    };

    return (
      <FormGroup className={className}>
        {label && (
          <Label id={inputId} notify={notify}>
            <span>{updatedLabelText || label}</span>
          </Label>
        )}
        <Input
          id={inputId}
          {...field}
          type="file"
          invalid={!!errorMessage}
          onChange={e => {
            updateLabel(e);
            setFieldValue(name, "");
            onChange && onChange(e);
          }}
          onValueChange={e => {}}
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

File.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool
};

export default File;
