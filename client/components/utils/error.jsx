import React from "react";
import "../phone.scss";

const Error = ({ error, onError }) => {
  return <p className="error">{error}</p>;
};

export default React.memo(Error);
