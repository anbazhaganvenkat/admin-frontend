import React from "react";
import Select from "./core/Select";

class Country extends React.Component {
  render() {
    const countryOptions = [
      {
        value: "United States",
        label: "United States"
      }
    ];
    const {
      name,
      label,
      placeholder,
      error,
      notify,
      required,
      defaultValue,
      countryOptionsFromProps
    } = this.props;

    return (
      <Select
        name={name}
        label={label}
        options={countryOptionsFromProps || countryOptions}
        placeholder={placeholder}
        error={error}
        required={required}
        defaultValue={defaultValue || ""}
      />
    );
  }
}
export default Country;
