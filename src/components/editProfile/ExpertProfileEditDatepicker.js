import React, { useState } from "react";
import DatePicker from "react-date-picker";

const ExpertProfileEditDatepicker = ({
  name,
  placeholder,
  value,
  onChange,
  clearIcon
}) => {
  let newDate = value ? new Date(value) : "";
  const [date, setDate] = useState(newDate);
  return (
    <DatePicker
      name={name}
      className="datepicker"
      dayPlaceholder={placeholder}
      value={date}
      onChange={val => {
        setDate(val);
        onChange(val);
      }}
      clearIcon={clearIcon}
    />
  );
};

export default ExpertProfileEditDatepicker;
