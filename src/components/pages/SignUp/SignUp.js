import React from "react";
import "./SignUp.css";

export const SignUp = () => {
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
    });
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
          <input
            className="signup__input"
            name="username"
            placeholder="username"
            type="text"
          />
          <input
            className="signup__input"
            name="password"
            placeholder="password"
            type="password"
          />
          <input
            className="signup__input"
            placeholder="repeat password"
            name="repeatPassword"
            type="password"
          />
          <input
            className="signup__input"
            placeholder="firstName"
            name="firstName"
            type="text"
          />
          <input
            className="signup__input"
            placeholder="last name"
            name="lastName"
            type="text"
          />
          <input
            className="signup__input"
            name="age"
            placeholder="age"
            type="number"
          />
          <button className="signup__submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
