import React from "react";

export const NavigationItem = (props) => {
  return (
    <div className={props.props.className}>
      {props.props.content}
      <img src="/images/arrow-down-sign-to-navigate.svg" alt="arrow" />
    </div>
  );
};
