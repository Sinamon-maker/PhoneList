import React from "react";
import ListItem from "./listItems";

const List = ({ list }) => {
  return (
    <ul className="list-phone">
      {list.map((it) => (
        <ListItem key={it._id} item={it} />
      ))}
    </ul>
  );
};

export default List;
