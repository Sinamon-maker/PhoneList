import React from 'react'
import "../phone.scss";

const Error = ({error, onError}) => {
  return <p className="error">{error}</p>;
}

export default Error;