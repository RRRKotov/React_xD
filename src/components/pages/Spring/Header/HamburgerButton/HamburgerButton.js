import React, { useContext } from "react";
import { Context } from "../../hooks/Context.js";

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
