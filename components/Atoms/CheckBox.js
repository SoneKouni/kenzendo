import React from "react";

const CheckBox = ({ label, checked, onChange }) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
