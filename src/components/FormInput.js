import React from "react";

const FormInput = ({ type, name, value, onChange, label }) => (
  <div className="formInput">
    <label>{label}</label>
    <div>
      <input
        style={{
          borderColor: "#d8d8d8",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "5px",
          padding: "5px",
        }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default FormInput;
