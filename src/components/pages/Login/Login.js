import React, { useState, useEffect } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import data from "./Login.json";
import { Input } from "../../reusableComponents/Input/Input.js";

export const Login = () => {
  sessionStorage.setItem("isLogged", 0);
  const [errors, setErrors] = useState("as");
  const history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let loginForm = e.target;
    let formData = new FormData(loginForm);
    let data4Server = convertFormData2JSON(formData);
    fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data4Server,
    })
      .then((response) => {
        return response.json();
      })
      .then((loginObj) => {
        loginObj.errors.forEach((item, index) => {
          data[index].errorStatus = item;
        });
        if (loginObj.isInvalid === 0) {
          sessionStorage.isLogged = 1;
          history.push("/");
        }

        setErrors(loginObj);
      });
  };
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let unix = Date.now();
  console.log(unix);


  

  function convertFormData2JSON(formData) {
    let obj = {};
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return JSON.stringify(obj);
  }

  const signUpRedirect = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  useEffect(() => {
    return () => {
      if (errors.isInvalid === 0) {
        sessionStorage.isLogged = 1;
      }
    };
  });

  return (
    <div className="login__main">
      <form
        id="loginForm"
        className="login__container"
        onSubmit={handleOnSubmit}
        action="#"
      >
        <h1 className="login__title">Login</h1>
        {data.map((item) => (
          <Input props={item} key={item.id} />
        ))}
        <div className="login__button">
          <button>Login</button>OR
          <button onClick={signUpRedirect}>Signup</button>
        </div>
      </form>
    </div>
  );
};
