import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, phoneToReduxViaSocket } from "../redux/reducers/phone";
import Error from "./utils/error";
import Select from "./utils/select";
import InputPhone from "./utils/input";
import Button from "./utils/button";
import List from "./utils/list";
import { countryCodes } from "../../config.json";
import "./phone.scss";

const Phones = () => {
  const list = useSelector((s) => s.phone.list);
  const dispatch = useDispatch();

  const [number, setNumber] = useState("");
  const [validate, setValidate] = useState(true);

  useEffect(() => {
    dispatch(updateCode(countryCodes[0].code));
  }, []);

  const validateNumber = (entered) => {
    if (entered.length > 3 && entered.length < 11) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  const error = () =>
    validate ? "" : "Phone number should be between 3 and 10 characters";

  const onChangeCountryCode = (event) => {
    dispatch(updateCode(event.target.value));
  };

  const handleChange = useCallback(
    (event) => {
      if (
        /^[0-9]+$/.test(event.target.value) ||
        event.target.value.length === 0
      ) {
        const newNumber = event.target.value;
        validateNumber(newNumber);
        setNumber(newNumber);
      }
    },
    [setNumber]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validate) {
        dispatch(phoneToReduxViaSocket(number));
        const newNumber = "";
        setNumber(newNumber);
      }
    },
    [setNumber, validate]
  );

  return (
    <div className="input-group">
      <form onSubmit={handleSubmit}>
        <div className="input-group__content">
          <Select countryCodes={countryCodes} onChange={onChangeCountryCode} />
          <InputPhone value={number} onChange={handleChange} />
          <Button validate={validate} />
        </div>
        <Error error={error()} onError={handleSubmit} />
      </form>
      <List list={list} />
    </div>
  );
};

export default Phones;
