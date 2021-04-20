import React, { useContext } from "react";
import { Context } from "../../hooks/Context.js";
import "./HamburgerButton.css"

export const HamburgerButton = () => {
  const methods = useContext(Context);
  return (
    <div onClick={methods.openMobile} className="navCont__hamburger">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
