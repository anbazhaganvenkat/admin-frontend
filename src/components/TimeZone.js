import React from "react";
import Select from "./core/Select";

export const TimeZones = [
  {
    value: "(GMT-05:00) Eastern Time",
    label: "(GMT-05:00) Eastern Time"
  },
  {
    value: "(GMT-06:00) Central Time",
    label: "(GMT-06:00) Central Time"
  },
  {
    value: "(GMT-07:00) Mountain Time",
    label: "(GMT-07:00) Mountain Time"
  },
  {
    value: "(GMT-08:00) Pacific Time",
    label: "(GMT-08:00) Pacific Time"
  },
  {
    value: "(GMT-09:00) Alaska Time",
    label: "(GMT-09:00) Alaska Time"
  },
  {
    value: "(GMT-10:00) Hawaii Time",
    label: "(GMT-10:00) Hawaii Time"
  }
];
class TimeZone extends React.Component {
  render() {
    const {
      name,
      label,
      placeholder,
      options,
      error,
      required,
      defaultValue
    } = this.props;

    return (
      <Select
        name={name}
        label={label}
        options={TimeZones}
        placeholder={placeholder}
        error={error}
        required={required}
        defaultValue={defaultValue}
      />
    );
  }
}
export default TimeZone;
