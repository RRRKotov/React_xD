import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const buttonOnClickHandler = () => {
    if (username === "admin" && password === "1234") {
      history.push("/");
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login__main">
      <div className="login__container">
        <h1>Login</h1>
        <div className="login__input">
          <input
            onChange={onChangeUsername}
            type="text"
            placeholder="username"
          />
        </div>
        <div className="login__input">
          <input
            onChange={onChangePassword}
            type="password"
            placeholder="password"
          />
        </div>

        <div className="login__button">
          <button onClick={buttonOnClickHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};
