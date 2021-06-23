import React from "react";
import { Provider } from "react-redux";
import store from "../redux";
import Phones from "./phones";





const Root = () => {
  return (
    <Provider store={store}>
      <Phones />
    </Provider>
  );
};

export default Root;
