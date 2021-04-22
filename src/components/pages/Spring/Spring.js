import React, { useState, useEffect } from "react";

import { Context } from "./hooks/Context.js";

import { Mobile } from "./Mobile/Mobile.js";

import { Header } from "./Header/Header.js";
import { Projects } from "./Projects/Projects.js";
import { Container } from "./Container/Container.js";
import { useHistory } from "react-router-dom";

export const Spring = () => {
  const [mobileStyles, setMobileStyles] = useState({ display: "none" });

  const openMobile = () => {
    setMobileStyles({ display: "block" });
  };

  const closeMobile = () => {
    setMobileStyles({ display: "none" });
  };

  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.isLogged !== "1") {
      history.push("/login");
    }
  });

  return (
    <Context.Provider value={{ openMobile, closeMobile, mobileStyles }}>
      <Mobile />
      <Header />
      <Projects />
      <Container />
    </Context.Provider>
  );
};
