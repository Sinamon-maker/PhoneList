import React from "react";
import "../phone.scss";

const InputPhone = (props) => {
  const { value, onChange } = props;

  return (
    <input
      className="input-group_phone"
      type="phone"
      name="phone"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputPhone;
