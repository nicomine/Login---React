import { useState } from "react";

import "./input.styles.css";
import Buttons from "./ButtonsFN";

export default function Input({
  titleLabel,
  tagFor,
  inputType,
  name,
  onChanges,
  value,
}) {

  const [type,setType] = useState(inputType)

  const togglePassword = () =>{
    if(type==="password"){
      setType("text")
    }else{
      setType("password")
    }
  }
  
  return (
    <div>
      <label className="input-label" htmlFor={tagFor}>
        {titleLabel}
      </label>
      <input
        className="inputs"
        type={type}
        id={tagFor}
        onChange={onChanges}
        name={name}
        value={value}
        required
      />
      {name === "password" && <button onClick={togglePassword}>Show Password</button>}
    </div>
  );
}
