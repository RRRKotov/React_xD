import React, { useState } from "react";
import "./App.css";
import data from "./data.json";
import { ContainerItem } from "./components/containerItem/ContainerItem.js";
import { ListItem } from "./components/listItem/ListItem.js";
import { MobileListItem } from "./components/mobileListItem/MobileListItem.js";
import { NavigationItem } from "./components/navigationItem/NavigationItem.js";

export const App = () => {
  const [newArray, setNewArray] = useState(data);

  const [mobileStyles, setMobileStyles] = useState({ display: "none" });

  const [containerStyles, setContainerStyles] = useState({ display: "block" });

  let newData = data;

  let whySpringArray = [
    "Overview",
    "Microservices", //(Spell checker doesn't like it)Same name in the original site
    "Reactive",
    "Event Driven",
    "Cloud",
    "Web Applications",
    "Serverless",
    "Batch",
  ];

  let learnArray = ["Overview", "Quickstart", "Guides", "Blog"];

  let projectsArray = [
    "Overview",
    "Spring Boot",
    "Spring Framework",
    "Spring Cloud",
    "Spring Cloud Data Flow",
    "Spring Data",
    "Spring Integration",
    "Spring Batch",
    "Spring Security",
  ];

  let communityArray = ["Overview", "Events", "Team"];

  let InputChange = (e) => {
    newData = data.filter((item) => {
      return (
        item.content.toUpperCase().includes(e.target.value.toUpperCase()) ||
        item.title.toUpperCase().includes(e.target.value.toUpperCase())
      );
    });

    setNewArray(newData);
  };

  let mobileOpenClose = () => {
    if (mobileStyles.display === "block") {
      setMobileStyles({ display: "none" });
      setContainerStyles({ display: "block" });
    } else {
      setMobileStyles({ display: "block" });
      setContainerStyles({ display: "none" });
    }
  };

  let mobileData = [
    {
      titleClass: "mobile__why",
      content: "Why Spring",
      listClass: "mobile__ul why",
      array: whySpringArray,
    },
    {
      titleClass: "mobile__learn",
      content: "Learn",
      listClass: "mobile__ul learn",
      array: learnArray,
    },
    {
      titleClass: "mobile__projects",
      content: "Projects",
      listClass: "mobile__ul proj",
      array: projectsArray,
    },
    {
      titleClass: "mobile__community",
      content: "Community",
      listClass: "mobile__ul comm",
      array: communityArray,
    },
  ];

  let navigationData = [
    { className: "navCont__whySpring_button", content: "Why Spring" },
    { className: "navCont__learn_button", content: "Learn" },
    { className: "navCont__projects_button", content: "Projects" },
    { className: "navCont__community_button", content: "Community" },
  ];

  return (
    <div>
      <div style={mobileStyles} className="mobile">
        <nav className="mobile__nav">
          <div onClick={mobileOpenClose} className="mobile__close">
            <img src="images/close.png" alt="close" />
          </div>
          <div className="mobile__main">
            {mobileData.slice(0, 3).map((item, index) => (
              <MobileListItem props={item} key={index} />
            ))}

            <div>
              <a className="mobile__link" href="/#">
                Training
              </a>
            </div>
            <div>
              <a className="mobile__link" href="/#">
                Support
              </a>
            </div>

            {mobileData.slice(3, 4).map((item, index) => (
              <MobileListItem props={item} key={index} />
            ))}
          </div>
        </nav>
      </div>

      <header className="header">
        <nav className="nav">
          <div className="navCont">
            <div className="navCont__logo">
              <a href="/#">
                <img
                  src="./images/spring-logo-9146a4d3298760c2e7e49595184e1975.svg"
                  alt="logo"
                />
              </a>
            </div>
            <div className="navCont__list">
              {navigationData.slice(0, 3).map((item, index) => (
                <NavigationItem props={item} key={index} />
              ))}

              <div>
                <a href="/#"> Training</a>
              </div>
              <div>
                <a href="/#"> Support</a>
              </div>

              {navigationData.slice(3, 4).map((item, index) => (
                <NavigationItem props={item} key={index} />
              ))}

              <ul className="navCont__whySpring">
                {<ListItem props={whySpringArray} />}
              </ul>

              <ul className="navCont__learn">
                {<ListItem props={learnArray} />}
              </ul>

              <ul className="navCont__project">
                {<ListItem props={projectsArray} />}
              </ul>

              <ul className="navCont__community">
                {<ListItem props={communityArray} />}
              </ul>
            </div>
            <div onClick={mobileOpenClose} className="navCont__hamburger">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <hr />
        </nav>
      </header>

      <div className="projects">
        <div className="projects__cont">
          <div className="projects__textName">Projects</div>
          <div className="projects__text">
            From configuration to security, web apps to big data—whatever the
            infrastructure needs of your application may be, there is a Spring
            Project to help you build it. Start small and use just what you
            need—Spring is modular by design.
          </div>
        </div>
      </div>
      <div className="input">
        <input onChange={InputChange} type="text" placeholder="search" />
      </div>
      <div style={containerStyles} className="container">
        <div className="container__main">
          {newArray.map((item, index) => {
            return (
              <div className="container__item" key={index}>
                {<ContainerItem props={item} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
