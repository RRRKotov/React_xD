import React from "react";
import { Spring } from "./components/pages/Spring/Spring.js";
import { Login } from "./components/pages/Login/Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignUp } from "./components/pages/SignUp/SignUp.js";
import "./App.css";

export const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Spring />
        </Route>
      </Switch>
    </Router>
  );
};
