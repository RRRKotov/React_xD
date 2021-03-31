import React from "react";

export const ListItem = ({ props }) => {
  return props.map((item, index) => (
    <li key={index}>
      <a href="#">{item}</a>
    </li>
  ));
};
