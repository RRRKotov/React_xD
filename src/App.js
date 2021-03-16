import React from "react";
import "./App.css";
import data from "./data.json";
import Itemcomponent from "./ItemComponent.js";

class App extends React.Component {
  state = {
    newArray: [],
    itemsArray: [],
  };
  componentWillMount() {
    data.forEach((item) => {
      this.state.itemsArray.push(<Itemcomponent props={item} />);
    });
  }

  render() {
    let newData = [];

    let InputChange = (e) => {
      this.state.itemsArray.length = 0;
      newData = data.filter((item) => {
        return (
          item.content.toUpperCase().includes(e.target.value.toUpperCase()) ||
          item.title.toUpperCase().includes(e.target.value.toUpperCase())
        );
      });

      this.setState({
        newArray: newData,
      });
    };

    this.state.newArray.forEach((item) => {
      this.state.itemsArray.push(<Itemcomponent props={item} />);
    });

    let mobileOpenClose = () => {
      if (this._mobile.style.display === "block") {
        this._mobile.style.display = "none";
        this._container.style.display = "block";
      } else {
        this._mobile.style.display = "block";
        this._container.style.display = "none";
      }
    };

    return (
      <div>
        <div ref={(a) => (this._mobile = a)} className="mobile">
          <nav className="mobile__nav">
            <div onClick={mobileOpenClose} className="mobile__close">
              <img src="images/close.png" alt="close" />
            </div>
            <div className="mobile__main">
              <div className="mobile__why">
                <div className="mobile__title">Why Spring</div>
                <div className="mobile__arrow"></div>
              </div>
              <div className="mobile__ul why">
                <ul className="">
                  <li>
                    <a href="/#"> Overview</a>
                  </li>
                  <li>
                    <a href="/#"> Microservices</a>
                  </li>
                  <li>
                    <a href="/#"> Reactive</a>
                  </li>
                  <li>
                    <a href="/#"> Event Driven</a>
                  </li>
                  <li>
                    <a href="/#"> Cloud</a>
                  </li>
                  <li>
                    <a href="/#"> Web Applications</a>
                  </li>
                  <li>
                    <a href="/#"> Serverless</a>
                  </li>
                  <li>
                    <a href="/#"> Batch</a>
                  </li>
                </ul>
              </div>
              <div className="mobile__learn">
                <div className="mobile__title">Learn</div>
                <div className="mobile__arrow"></div>
              </div>
              <div className="mobile__ul learn">
                <ul className=" ul">
                  <li>
                    <a href="/#"> Overview</a>
                  </li>
                  <li>
                    <a href="/#"> Quickstart</a>
                  </li>
                  <li>
                    <a href="/#">Guides</a>
                  </li>
                  <li>
                    <a href="/#">Blog</a>
                  </li>
                </ul>
              </div>
              <div className="mobile__projects">
                <div className="mobile__title">Projects</div>
                <div className="mobile__arrow"></div>
              </div>
              <div className="mobile__ul proj">
                <ul className=" ul">
                  <li>
                    <a href="/#">Overview</a>
                  </li>
                  <li>
                    <a href="/#">Spring Boot</a>
                  </li>
                  <li>
                    <a href="/#">Spring Framework</a>
                  </li>
                  <li>
                    <a href="/#">Spring Cloud</a>
                  </li>
                  <li>
                    <a href="/#">Spring Cloud Data Flow</a>
                  </li>
                  <li>
                    <a href="/#">Spring Data</a>
                  </li>
                  <li>
                    <a href="/#">Spring Integration</a>
                  </li>
                  <li>
                    <a href="/#">Spring Batch</a>
                  </li>
                  <li>
                    <a href="/#">Spring Security</a>
                  </li>
                </ul>
              </div>
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
              <div className="mobile__community">
                <div className="mobile__title">Community</div>
                <div className="mobile__arrow"></div>
              </div>
              <div className="mobile__ul comm">
                <ul className="comm ul">
                  <li>
                    <a href="/#">Overview</a>
                  </li>
                  <li>
                    <a href="/#">Events</a>
                  </li>
                  <li>
                    <a href="/#">Team</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <header className="header">
          <nav className="nav">
            <div className="navcont">
              <div className="navcont__logo">
                <a href="/#">
                  <img
                    src="./images/spring-logo-9146a4d3298760c2e7e49595184e1975.svg"
                    alt="logo"
                  />
                </a>
              </div>
              <div className="navcont__list">
                <div className="navcont__whyspring_button">
                  Why Spring
                  <img src="/images/arrow-down-sign-to-navigate.svg" alt="arrow" />
                </div>
                <div className="navcont__learn_button">
                  Learn
                  <img src="/images/arrow-down-sign-to-navigate.svg" alt="arrow" />
                </div>
                <div className="navcont__projects_button">
                  Projects
                  <img src="/images/arrow-down-sign-to-navigate.svg" alt="arrow" />
                </div>
                <div>
                  <a href="/#"> Training</a>
                </div>
                <div>
                  <a href="/#"> Support</a>
                </div>
                <div className="navcont__community_button">
                  Community
                  <img src="/images/arrow-down-sign-to-navigate.svg" alt="arrow" />
                </div>

                <ul className="navcont__whyspring">
                  <li>
                    <a href="/#"> Overview</a>
                  </li>
                  <li>
                    <a href="/#"> Microservices</a>
                  </li>
                  <li>
                    <a href="/#"> Reactive</a>
                  </li>
                  <li>
                    <a href="/#"> Event Driven</a>
                  </li>
                  <li>
                    <a href="/#"> Cloud</a>
                  </li>
                  <li>
                    <a href="/#"> Web Applications</a>
                  </li>
                  <li>
                    <a href="/#"> Serverless</a>
                  </li>
                  <li>
                    <a href="/#"> Batch</a>
                  </li>
                </ul>

                <ul className="navcont__learn">
                  <li>
                    <a href="/#"> Overview</a>
                  </li>
                  <li>
                    <a href="/#"> Quickstart</a>
                  </li>
                  <li>
                    <a href="/#">Guides</a>
                  </li>
                  <li>
                    <a href="/#">Blog</a>
                  </li>
                </ul>

                <ul className="navcont__project">
                  <li>
                    <a href="/#">Overview</a>
                  </li>
                  <li>
                    <a href="/#">Spring Boot</a>
                  </li>
                  <li>
                    <a href="/#">Spring Framework</a>
                  </li>
                  <li>
                    <a href="/#">Spring Cloud</a>
                  </li>
                  <li>
                    <a href="/#">Spring Cloud Data Flow</a>
                  </li>
                  <li>
                    <a href="/#">Spring Data</a>
                  </li>
                  <li>
                    <a href="/#">Spring Integration</a>
                  </li>
                  <li>
                    <a href="/#">Spring Batch</a>
                  </li>
                  <li>
                    <a href="/#">Spring Security</a>
                  </li>
                </ul>

                <ul className="navcont__community">
                  <li>
                    <a href="/#">Overview</a>
                  </li>
                  <li>
                    <a href="/#">Events</a>
                  </li>
                  <li>
                    <a href="/#">Team</a>
                  </li>
                </ul>
              </div>
              <div onClick={mobileOpenClose} className="navcont__hamburger">
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
            <div className="projects__textname">Projects</div>
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
        <div
          ref={(a) => {
            this._container = a;
          }}
          className="container"
        >
          <div className="container__main">
            {this.state.itemsArray.map((item, index) => {
              return (
                <div className="container__item" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
