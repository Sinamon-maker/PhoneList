import React from "react";

const ListItems = ({ item }) => {
  return (
    <li className="list-phone__list" >
      {item.phone}
    </li>
  );
};

export default React.memo(ListItems);
