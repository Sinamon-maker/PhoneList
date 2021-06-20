import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCode, phoneToRedux } from "../redux/reducers/phone";
import "./hom.scss";

const Phones = () => {
  const code = useSelector((s) => s.phone.code);
    const list = useSelector((s) => s.phone.list);
  const dispatch = useDispatch();

  const [number, setNumber] = useState("");
  const [error, setErrorMessage] = useState("")

  const handleChange = (event) => {
    if (/\d+/.test(Number(event.target.value))) {
      setNumber(event.target.value);
    }
  };

  const handleSubmit = (e) => {

e.preventDefault();
if (number.length < 4 || number.length > 10){
  setErrorMessage("Phone number should be between 3 and 10 characters")
  }
  dispatch(phoneToRedux(number))
  }

  return (
    <div>

      code {code}
            <form className="input-group" onSubmit = {handleSubmit}>
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
        <p className = "error">

        {error}
        </p>
       <div>{list.map(it=> <li key = {it._id}>{it.phone}</li>)}</div>
      </form>
    </div>
  );
};

export default Phones;
