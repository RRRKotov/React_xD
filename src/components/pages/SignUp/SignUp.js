import React, { useState } from "react";
import "./SignUp.css";
import data from "./SignUp.json";
import { Input } from "../../reusableComponents/Input/Input.js";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
  const history = useHistory();
  const [errors, setErrors] = useState(data);
  localStorage.isLogged = 0;
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let myForm = e.target;
    let formData = new FormData(myForm);
    let data4Server = convertFormData2JSON(formData);
    fetch(`http://localhost:5000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data4Server,
    })
      .then((response) => {
        return response.json();
      })
      .then((errObj) => {
        localStorage.setItem("accessToken", errObj.tokens.accessToken);
        localStorage.setItem("refreshToken", errObj.tokens.refreshToken);
        localStorage.setItem("lastCheckedToken", "accessToken");
        if (errObj.loginExists !== "") {
          //znau, 4to bad practice
          //2 different errors 4 0ne input((((
          data[0].errorMessage = errObj.loginExists;
        }
        errObj.errors.forEach((item, index) => {
          data[index].errorStatus = item;
        });
        if (errObj.isInvalid === 0) {
          localStorage.isLogged = 1;
          history.push("/");
        }
        setErrors(errObj);
      });
  };

  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  function convertFormData2JSON(formData) {
    let obj = {};
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return JSON.stringify(obj);
  }

  return (
    <div className="signup__main">
      <div className="signup__container">
        <div className="signup__title">Registration</div>
        <form
          className="signup__form"
          id="myForm"
          onSubmit={handleOnSubmit}
          action="#"
        >
          {data.map((item) => (
            <Input props={item} key={item.id} />
          ))}
          <div className="buttons">
            <button className="signup__submit">Submit</button>
            <p>OR</p>
            <button onClick={goToLogin} className="signup__submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
