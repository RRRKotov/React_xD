import React, { useState, useEffect } from "react";
import "./SignUpInput.css";

export const SignUpInput = (props) => {
  const [errorStyle, setErrorStyle] = useState({ visibility: "hidden" });
  useEffect(() => {
    if (props.props.errorStatus === 1) {
      setErrorStyle({ visibility: "visible" });
    } else {
      setErrorStyle({ visibility: "hidden" });
    }
  }, [props.props.errorStatus]);

  return (
    <>
      <input
        className="signup__input"
        autoComplete="off"
        name={props.props.name}
        placeholder={props.props.placeholder}
        type={props.props.type}
      />
      <div style={errorStyle} className="signup__error">
        {props.props.errorMessage}
      </div>
    </>
  );
};
