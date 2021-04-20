import React, { useState } from "react";
import { ListItem } from "../../../../reusableComponents/ListItem/ListItem.js";
import "./MobileItem.css";
export const MobileItem = (props) => {
  const [listStyle, setListStyle] = useState({ display: "none" });

  const [arrowStyles, setLArrowStyles] = useState({
    borderWidth: "0 2px 2px 0",
    margin: "0 0 0 5px",
  });

  const onClickHandler = () => {
    if (listStyle.display === "none") {
      setListStyle({ display: "block" });
      setLArrowStyles({
        borderWidth: "2px 0px 0px 2px",
        margin: "5px 0 0 10px",
      });
    } else {
      setListStyle({ display: "none" });
      setLArrowStyles({ borderWidth: "0 2px 2px 0", margin: "0 0 0 5px" });
    }
  };
  return (
    <React.Fragment>
      <div className="mobile__block" onClick={onClickHandler}>
        <div className="mobile__title">{props.props.content}</div>
        <div style={arrowStyles} className="mobile__arrow"></div>
      </div>
      <div style={listStyle} className="mobile__ul">
        <ul className=" ul">{<ListItem props={props.props.array} />}</ul>
      </div>
    </React.Fragment>
  );
};
