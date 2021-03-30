import React from "react";

export const ContainerItem = ({ props }) => {
  return (
    <div className="container__body">
      <img src={props.img} />
      <h3>
        <div className="container__name">{props.title}</div>
      </h3>
      <div className="container__text">{props.content}</div>
    </div>
  );
};
