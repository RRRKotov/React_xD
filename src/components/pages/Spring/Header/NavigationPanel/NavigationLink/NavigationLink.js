import React from "react";
import "./NavigationLink.css"
export const NavigationLink = ({ props }) => {
  return (
    <div className="navCont__block">
      <div>
        <div className="navCont__button">
          <a href="/#">{props}</a>
        </div>
      </div>
    </div>
  );
};
