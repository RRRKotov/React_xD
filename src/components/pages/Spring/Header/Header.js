import React from "react";
import "./Header.css"
import { Logo } from "./Logo/Logo.js";
import { HamburgerButton } from "./HamburgerButton/HamburgerButton.js";
import { NavigationPanel } from "./NavigationPanel/NavigationPanel.js";
export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="navCont">
          <Logo />
          <NavigationPanel />
          <HamburgerButton />
        </div>
        <hr />
      </nav>
    </header>
  );
};
