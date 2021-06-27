import React from "react";

const Button = ({ validate }) => {
  return (
    <button className="btn btn-primary" type="submit" disabled={!validate}>
      SEND
    </button>
  );
};

export default React.memo(Button);
