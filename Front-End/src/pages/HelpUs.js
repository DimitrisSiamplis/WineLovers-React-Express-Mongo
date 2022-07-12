import React from "react";
import { Container, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import { useState } from "react";
import "./HelpUs.css";

const HelpUs = () => {
  return (
    <div>
      <div className="cardStyle helpUs">
        <h2 className="formTitle">Login to your account</h2>

        <div className="inputDiv">
          <label className="inputLabel">New Password</label>
          <input type="password" id="password" />
        </div>

        <div className="inputDiv">
          <label className="inputLabel">Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>

        <div className="buttonWrapper">
          <button
            type="submit"
            id="submitButton"
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
  );
};

export default HelpUs;
