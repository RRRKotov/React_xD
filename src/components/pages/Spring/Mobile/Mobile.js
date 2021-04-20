import { MobileItem } from "./MobileItem/MobileItem.js";
import closeImage from "./media/close.png";
import Data from "../../../../dataSets/Data.json";
import { MobileLink } from "./MobileLink/MobileLink.js";
import { Context } from "../hooks/Context.js";
import React, { useContext } from "react";
import "./Mobile.css"
export const Mobile = () => {
  const methods = useContext(Context);

  return (
    <div className="mobile" style={methods.mobileStyles}>
      <nav className="mobile__nav">
        <div className="mobile__close" onClick={methods.closeMobile}>
          <img src={closeImage} alt="close" />
        </div>
        <div className="mobile__main">
          {Data.map((item) => {
            if (item.type === "link") {
              return <MobileLink props={item.content} key={item.id} />;
            } else {
              return <MobileItem props={item} key={item.id} />;
            }
          })}
        </div>
      </nav>
    </div>
  );
};

