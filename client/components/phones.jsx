import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, phoneToReduxViaSocket } from "../redux/reducers/phone";
import Error from "./utils/error";
import "./phone.scss";

const countryCodes = [
  { country: "Russia", code: "+7" },
  { country: "Poland", code: "+48" },
  { country: "Ucraine", code: "+380" },
];

const Phones = () => {
  const code = useSelector((s) => s.phone.code);
  const list = useSelector((s) => s.phone.list);
  const dispatch = useDispatch();

  const [number, setNumber] = useState("");
  const [error, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(updateCode(countryCodes[0].code));
  }, []);

  const handleChange = (event) => {
    if (/\d+/.test(Number(event.target.value))) {
      setNumber(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number.length < 4 || number.length > 10) {
      setErrorMessage("Phone number should be between 3 and 10 characters");
    } else {
      setErrorMessage("");
      dispatch(phoneToReduxViaSocket(number));
    }
  };

  return (
    <div className="input-group">
      code {code}
      <form onSubmit={handleSubmit}>
        <select
          onChange={(event) => {
            dispatch(updateCode(event.target.value));
          }}
        >
          {" "}
          <option value="{code}">{code}</option>
          <option value="+3">+3</option>
          <option value="+4">+4</option>{" "}
        </select>
        <input
          className="input-group_phone"
          type="phone"
          value={number}
          onChange={handleChange}
        />
        <button type="submit">SEND</button>

        <Error error={error} onError={handleSubmit} />
      </form>
      <ul className="list-phone">
        {list.map((it) => (
          <li className="list-phone__list" key={it._id}>
            {it.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Phones;
