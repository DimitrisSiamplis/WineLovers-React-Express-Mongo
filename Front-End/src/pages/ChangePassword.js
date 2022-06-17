import React from "react";
import "./ChangePassword.css";
// import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const changePassword = () => {
    let passwordDetails = {
      newPassword: newPassword,
      newConfirmPassword: newConfirmPassword,
      userEmail: userEmail,
    };
    fetch("http://localhost:4000/changePassword", {
      method: "POST",
      body: JSON.stringify(passwordDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  const onChangeHandler = () => {
    console.log(newPassword, newConfirmPassword, userEmail);
    changePassword()
    setNewPassword("");
    setNewConfirmPassword("");
  };

  return (
    <div>
      <div className="mainDiv">
        <div className="cardStyle">
          <h2 className="formTitle">Login to your account</h2>

          <div className="inputDiv">
            <label className="inputLabel" >
              New Password
            </label>
            <input
              value={newPassword}
              type="password"
              id="password"
            
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>

          <div className="inputDiv">
            <label className="inputLabel" >
              Confirm Password
            </label>
            <input
              value={newConfirmPassword}
              type="password"
              id="confirmPassword"
             
              onChange={(e) => {
                setNewConfirmPassword(e.target.value);
              }}
            />
            {newPassword !== "" && newPassword.length < 5 && (
              <p className="alertMessage">
                Password must be more than <strong>5 characters!</strong>{" "}
              </p>
            )}

            {newPassword !== "" && newPassword !== newConfirmPassword && (
              <p className="alertMessage">Passwords do not matched!</p>
            )}
          </div>

          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              disabled={
                (newPassword !== "" && newPassword !== newConfirmPassword) ||
                newPassword.length < 5 ||
                newPassword === ""
              }
              onClick={onChangeHandler}
              className="submitButton pure-button pure-button-primary"
            >
              <span>Continue to Change</span>
            </button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
