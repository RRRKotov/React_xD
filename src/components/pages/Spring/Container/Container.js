import React, { useState, useEffect, useRef } from "react";
import "./Container.css";
import { ContainerItem } from "./ContainerItem/ContainerItem.js";
import { Base64 } from "js-base64";

export const Container = () => {
  const [isMount, setIsMount] = useState(true);
  let tokens = useRef({
    accessToken: localStorage.accessToken,
    refreshToken: localStorage.refreshToken,
  });

  useEffect(() => {
    setIsMount(true);
    if (isMount) {
      fetch(
        `http://localhost:5000/getInitialData?accessToken=${tokens.current.accessToken}&refreshToken=${tokens.current.refreshToken}`,
        {
          method: "get",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((dataFromServer) => {
          setNewArray(dataFromServer);
        });
    }

    return () => {
      setIsMount(false);
    };
  }, [isMount]);
  const [newArray, setNewArray] = useState([]);
  const [toggleNoResult, setToggleNoResult] = useState({
    visibility: "hidden",
  });

  const inputChange = (e) => {
    getFilteredData(e.target.value);
  };

  useEffect(() => {
    if (newArray.length === 0) {
      setToggleNoResult({ visibility: "visible" });
    } else {
      setToggleNoResult({ visibility: "hidden" });
    }
  }, [newArray]);

  const getTokensFromLocaleStorage = () => {
    const accessToken = localStorage.accessToken;
    const refreshToken = localStorage.refreshToken;
    tokens = { accessToken: accessToken, refreshToken: refreshToken };
  };

  const validateTokens = () => {
    const accessToken = tokens.accessToken;
    const refreshToken = tokens.refreshToken;
    const [hashedHeader, hashedPayload, signature] = accessToken.split(".");
    const decryptedPayload = Base64.decode(hashedPayload);
    const parsedPayload = JSON.parse(decryptedPayload);

    const currentDate = Date.now();
    if (parsedPayload.exp > currentDate) {
      console.log("access token is ok");
      tokens = { accessToken: accessToken, refreshToken: "" };
    } else {
      console.log("access token is expired");
      tokens = { accessToken: "", refreshToken: refreshToken };
    }
  };

  const getFilteredData = (value) => {
    validateTokens();
    console.log("I send");
    console.log(tokens);
    fetch(
      `http://localhost:5000/filter?value=${value}&accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((dataFromServer) => {
        console.log("I get");
        console.log(dataFromServer);
        if (dataFromServer.tokens.accessToken !== "") {
          console.log("change access token");
          localStorage.setItem(
            "accessToken",
            dataFromServer.tokens.accessToken
          );
        }
        if (dataFromServer.tokens.refreshToken !== "") {
          console.log("change refresh and access token");
          localStorage.setItem(
            "accessToken",
            dataFromServer.tokens.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            dataFromServer.tokens.refreshToken
          );
        }

        setNewArray(dataFromServer.array);
      });
  };
  useEffect(() => {
    getTokensFromLocaleStorage();
  });

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
