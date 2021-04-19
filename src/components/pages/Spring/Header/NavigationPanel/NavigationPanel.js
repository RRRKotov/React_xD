import React from "react";
import Data from "../../../../../dataSets/Data.json";
import { NavigationItem } from "./NavigationItem/NavigationItem.js";

import { NavigationLink } from "./NavigationLink/NavigationLink.js";
export const NavigationPanel = () => {
  return (
    <div className="navCont__list">
      {Data.map((item) => {
        if (item.type === "link") {
          return <NavigationLink props={item.content} key={item.id} />;
        } else {
          return <NavigationItem props={item} key={item.id} />;
        }
      })}
    </div>
  );
};
