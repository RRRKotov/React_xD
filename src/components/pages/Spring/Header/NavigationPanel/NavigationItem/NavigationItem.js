import React from "react";
import "./NavigationItem.css"
import arrowImage from "./media/arrow-down-sign-to-navigate.svg";
import { ListItem } from "../../../../../reusableComponents/ListItem/ListItem.js";
export const NavigationItem = (props) => {
  return (
    <div className="navCont__block">
      <div>
        <div className="navCont__button">
          {props.props.content}
          <img src={arrowImage} alt="arrow" />
        </div>
      </div>
      <ul>{<ListItem props={props.props.array} />}</ul>
    </div>
  );
};
