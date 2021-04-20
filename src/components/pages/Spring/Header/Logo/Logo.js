import React from "react";
import "./Logo.css"
import logoImage from "./media/spring-logo-9146a4d3298760c2e7e49595184e1975.svg";
export const Logo = () => {
  return (
    <div className="navCont__logo">
      <a href="/#">
        <img src={logoImage} alt="logo" />
      </a>
    </div>
  );
};
