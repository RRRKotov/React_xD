import React, { useState, useEffect } from "react";
import "./Container.css";
import { ContainerItem } from "./ContainerItem/ContainerItem.js";

export const Container = () => {
  const [isMount, setIsMount] = useState(true);
  useEffect(() => {
    setIsMount(true);
    if (isMount) {
      fetch(`http://localhost:5000/getInitialData`, {
        method: "get",
      })
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

  const getFilteredData = (value) => {
    fetch(`http://localhost:5000/filter?value=${value}`, {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((dataFromServer) => {
        setNewArray(dataFromServer);
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
