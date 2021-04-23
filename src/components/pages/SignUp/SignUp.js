import React, { useState } from "react";
import "./SignUp.css";
import data from "./SignUp.json";
import { SignUpInput } from "./SignUpInput/SignUpInput.js";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
  const history = useHistory();
  const [errors, setErrors] = useState(data);
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
        setErrors(errObj.errors);
        errObj.forEach((item, index) => {
          data[index].errorStatus = item;
        });
        setErrors(data);
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
            <SignUpInput props={item} key={item.id} />
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
