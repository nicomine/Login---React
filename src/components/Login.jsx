import { useEffect, useState } from "react";
// import * as Yup from "yup"

import Buttons from "./ButtonsFN";
import Input from "./Input";

import "./login.styles.css";

const initialFormValues = {
  email: "",
  password: "",
};

const validationsForm = (form) => {
  let errors = {},
    regExEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/g,
    regExPassword = /^(?=.*[a-z])(?=.*[A-Z]).{9,}$/g;

  if (!form.email) {
    errors.email = "You need to fill 'Email'";
  } else if (!regExEmail.test(form.email)) {
    errors.email = "Invalid Email";
  }

  if (!form.password) {
    errors.password = "You need to fill Password";
  } else if (!regExPassword.test(form.password)) {
    errors.password =
      "Invalid Password, it requires • +8 caracters • 1 May • 1 Min";
  }


  return errors;
};

export default function Login() {
  const [form, setForm] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [savedFormValues, setSavedFormValues] = useState(null);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validationsForm(form));
    console.log(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await window.localStorage.setItem(
      "formulario",
      JSON.stringify({
        email: form.email,
        password: form.password,
      })
    );

    window.alert("formulario guardado");

    setForm(initialFormValues);
    getInitialSavedValues();
  };

  const getInitialSavedValues = async () => {
    const response = await window.localStorage.getItem("formulario");

    if (response) {
      const savedFormValuesResponse = JSON.parse(response);
      setSavedFormValues({ ...savedFormValuesResponse });
    }
  };

  useEffect(() => {
    getInitialSavedValues();
  }, []);

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome back to Pretty Login</h2>
      <h3>It is great to have you back!</h3>
      <form onSubmit={handleSubmit}>
        <Input
          titleLabel={"Email"}
          tagFor={"email"}
          inputType={"email"}
          name={"email"}
          value={form.email}
          onChanges={handleBlur}
        />
        {errors.email && <p>{errors.email}</p>}
        <Input
          titleLabel={"Password"}
          tagFor={"password"}
          inputType={"password"}
          name={"password"}
          value={form.password}
          onChanges={handleBlur}
        />       
        {errors.password && <p>{errors.password}</p>}
        <div className="buttons-direction">
          <Buttons textButton={"Log In"} />
          <Buttons textButton={"Create Account"} />
        </div>
      </form>

      {savedFormValues && (
        <>
          <p>{savedFormValues.email}</p>
          <p>{savedFormValues.password}</p>
        </>
      )}
    </div>
  );
}
