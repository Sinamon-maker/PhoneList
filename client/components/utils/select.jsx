import React from "react";

const Select = ({ countryCodes, onChange }) => {
  return (
    <select onChange={onChange}>
      {countryCodes.map((country) => (
        <option value={country.code} key={country.code}>
          {country.code} {country.country}
        </option>
      ))}
    </select>
  );
};

export default React.memo(Select);
