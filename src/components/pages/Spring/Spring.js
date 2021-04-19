import React, { useState } from "react";
import "./Spring.css";
import { Context } from "./hooks/Context.js";

import { Mobile } from "./Mobile/Mobile.js";
import { Redirect } from "react-router-dom";
import { Header } from "./Header/Header.js";
import { Projects } from "./Projects/Projects.js";
import { Container } from "./Container/Container.js";

export const Spring = () => {
  const [mobileStyles, setMobileStyles] = useState({ display: "none" });

  const openMobile = () => {
    setMobileStyles({ display: "block" });
  };

  const closeMobile = () => {
    setMobileStyles({ display: "none" });
  };

  if (sessionStorage.isLogged !== "1") {
    return <Redirect to={"/login"} />;
  }
  return (
    <Context.Provider value={{ openMobile, closeMobile, mobileStyles }}>
      <Mobile />
      <Header />
      <Projects />
      <Container />
    </Context.Provider>
  );
};
