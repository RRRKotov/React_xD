import React from "react";
import { Spring } from "./components/pages/Spring/Spring.js";
import { Login } from "./components/pages/Login/Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



export const App = () => {

  return (
    <Router>
      <Switch>
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

// if (sessionStorage.isLogged !== "1") {
//   return <Redirect to={"/login"} />;
// }
