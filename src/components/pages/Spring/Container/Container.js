import React, { useState, useEffect, useRef } from "react";
import "./Container.css";
import { ContainerItem } from "./ContainerItem/ContainerItem.js";
import { useHistory } from "react-router-dom";

export const Container = () => {
  const history = useHistory();
  const [isMount, setIsMount] = useState(true);

  useEffect(() => {
    setIsMount(true);
    if (isMount) {
      fetchForInitialData(localStorage.lastCheckedToken);
    }
    return () => {
      setIsMount(false);
    };
  }, [isMount]);

  const fetchForInitialData = (tokenType) => {
    fetch(
      `http://localhost:5000/getInitialData?${tokenType}=${localStorage[tokenType]}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((dataFromServer) => {
        if (dataFromServer.isLogin == 0) {
          if (dataFromServer.tokenType == "refresh") {
            localStorage.setItem("isLogged", 0);
            history.push("/login");
          } else {
            localStorage.setItem("isLogged", 1);
            fetchForInitialData("refreshToken");
          }
        }

        if (dataFromServer.tokens.accessToken !== undefined) {
          localStorage.setItem(
            "accessToken",
            dataFromServer.tokens.accessToken
          );
        }
        setNewArray(dataFromServer.array);
      });
  };
  const [newArray, setNewArray] = useState([]);
  const [toggleNoResult, setToggleNoResult] = useState({
    visibility: "hidden",
  });

  const inputChange = (e) => {
    getFilteredData(e.target.value, localStorage.lastCheckedToken);
  };

  useEffect(() => {
    if (newArray.length === 0) {
      setToggleNoResult({ visibility: "visible" });
    } else {
      setToggleNoResult({ visibility: "hidden" });
    }
  }, [newArray]);

  const getFilteredData = (value, tokenType) => {
    let currentValue = value;
    fetch(
      `http://localhost:5000/filter?value=${value}&${tokenType}=${localStorage[tokenType]}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((dataFromServer) => {
        if (dataFromServer.isLogin == 0) {
          if (dataFromServer.tokenType == "refresh") {
            localStorage.setItem("isLogged", 0);
            history.push("/login");
          } else {
            localStorage.setItem("isLogged", 1);
            getFilteredData(currentValue, "refreshToken");
          }
        }

        if (dataFromServer.tokens.accessToken !== undefined) {
          localStorage.setItem(
            "accessToken",
            dataFromServer.tokens.accessToken
          );
        }
        setNewArray(dataFromServer.array);
      });
  };

  return (
    <div className="container">
      <div className="input">
        <input onChange={inputChange} type="text" placeholder="search" />
        <div className="container__noResult" style={toggleNoResult}>
          No Results(
        </div>
      </div>

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
  );
};
