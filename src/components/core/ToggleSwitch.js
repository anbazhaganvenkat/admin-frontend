import React from "react";

const ToggleSwitch = props => {
  const {
    label,
    label1,
    label2,
    name,
    title,
    handleChange,
    value,
    theme,
    size,
    outlined,
    className
  } = props;
  const switchOutlined = () => outlined && "outlined";
  const activeClass = () => (value ? "active" : "");
  const componentClass = [theme, size, switchOutlined(), activeClass()];
  return (
    <div className={[...componentClass, "switch-wrapper", className].join(" ")}>
      {title && <p className="font-weight-bold mb-2">{title}</p>}

      <div className="switch-wrapper">
        <label className="switch">
          <input
            name={name}
            type="checkbox"
            value={value}
            onChange={handleChange}
            checked={value}
          />
          <div className="slider" />
        </label>
        <h6>{value ? label2 : label1 ? label1 : label}</h6>
      </div>
    </div>
  );
};

export default ToggleSwitch;
