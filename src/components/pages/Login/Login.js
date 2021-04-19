import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";

export const Login = () => {
  sessionStorage.setItem("isLogged", 0);

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorStyle, setErrorStyle] = useState({ visibility: "hidden" });

  const buttonOnClickHandler = () => {
    postServerRequest(username, password);
  };

  const postServerRequest = (username, password) => {
    let userData = { username: username, password: password };
    fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((response) => {
      if (response.status === 202) {
        sessionStorage.isLogged = 1;
        history.push("/");
      } else {
        sessionStorage.isLogged = 0;
        setErrorStyle({ visibility: "visible " });
      }
    });
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
        <h1 className="login__title">Login</h1>
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
        <div style={errorStyle} className="login__error">
          <span>Wrong username or password(( Try again! </span>
        </div>
        <div className="login__button">
          <button onClick={buttonOnClickHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};
