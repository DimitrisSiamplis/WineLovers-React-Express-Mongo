import React from "react";
import "./EditProfile.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { validateEmail } from "./Functions/functions";
// import { Container } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const EditProfile = () => {
  const [user, setUser] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const getUser = (email) => {
    var emailForSearch = email === undefined ? userEmail : email;
    fetch(`http://localhost:4000/getUser/${emailForSearch}`)
      .then((res) => res.json())
      .then((json) => {
        setUser([json]);
        console.log([json]);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const edit = (firstName, lastName, email, mobile) => {
    let userDetails = {
      name: firstName + " " + lastName,
      email: email,
      mobile: mobile,
    };
    fetch("http://localhost:4000/editProfile", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");
        setNewMobile("");
      });
  };

  const onEditHandler = () => {
    var firstName =
      newFirstName === ""
        ? user[0].user.Name.split(" ")[0]
        : newFirstName.trim();
    var lastName =
      newLastName === "" ? user[0].user.Name.split(" ")[1] : newLastName.trim();
    var email = newEmail === "" ? user[0].user.Email : newEmail.trim();
    var mobile = newMobile === "" ? user[0].user.Mobile : newMobile.trim();
    edit(firstName, lastName, email, mobile);
    console.log(firstName, lastName, email, mobile);
  };

  return (
    <div>
      {user.length !== 0 && (
        <div className="mainDiv">
          <div className="cardStyle">
            <h2 className="formTitle">Edit your Profile</h2>

            <Container>
              <Row>
                <Col xs={6}>
                  <div className="inputDiv">
                    <label className="inputLabel">First Name</label>
                    <input
                      value={newFirstName}
                      type="text"
                      id="editText"
                      placeholder={user[0].user.Name.split(" ")[0]}
                      onChange={(e) => {
                        setNewFirstName(e.target.value);
                      }}
                    />
                  </div>
                  {newFirstName !== "" && newFirstName.length < 5 && (
                    <p className="alertMessage">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>Min 5 characters.</strong>{" "}
                    </p>
                  )}
                </Col>{" "}
                <Col xs={6}>
                  <div className="buttonWrapper">
                    <button
                      type="submit"
                      id="submitButton"
                      disabled={
                        (newFirstName !== "" && newFirstName.length < 5) ||
                        newFirstName === ""
                      }
                      onClick={onEditHandler}
                      className="submitButton pure-button pure-button-primary"
                    >
                      <span>Edit First Name</span>
                    </button>
                  </div>
                </Col>
              </Row>{" "}
              <hr />
              <Row>
                <Col xs={6}>
                  {" "}
                  <div className="inputDiv">
                    <label className="inputLabel">Last Name</label>
                    <input
                      value={newLastName}
                      type="text"
                      id="editText"
                      placeholder={user[0].user.Name.split(" ")[1]}
                      onChange={(e) => {
                        setNewLastName(e.target.value);
                      }}
                    />
                  </div>
                  {newLastName !== "" && newLastName.length < 5 && (
                    <p className="alertMessage">
                      {" "}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong>Min 5 characters.</strong>{" "}
                    </p>
                  )}
                </Col>
                <Col xs={6}>
                  <div className="buttonWrapper">
                    <button
                      type="submit"
                      id="submitButton"
                      disabled={
                        (newLastName !== "" && newLastName.length < 5) ||
                        newLastName === ""
                      }
                      onClick={onEditHandler}
                      className="submitButton pure-button pure-button-primary"
                    >
                      <span>Edit Last Name</span>
                    </button>
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={6}>
                  <div className="inputDiv">
                    <label className="inputLabel">Email</label>
                    <input
                      value={newEmail}
                      type="email"
                      id="editText"
                      placeholder={user[0].user.Email}
                      onChange={(e) => {
                        setNewEmail(e.target.value);
                      }}
                    />
                  </div>
                  {newEmail !== "" && !validateEmail(newEmail) && (
                    <p className="alertMessage">
                      {" "}
                      Email must iclude '@'' and '.'{" "}
                    </p>
                  )}
                </Col>
                <Col xs={6}>
                  <div className="buttonWrapper">
                    <button
                      type="submit"
                      id="submitButton"
                      disabled={
                        (newEmail !== "" && newEmail.length < 5) ||
                        newEmail === "" ||
                        !validateEmail(newEmail)
                      }
                      onClick={onEditHandler}
                      className="submitButton pure-button pure-button-primary"
                    >
                      <span>Edit Email</span>
                    </button>
                  </div>
                </Col>
              </Row>{" "}
              <hr />
              <Row>
                <Col xs={6}>
                  {" "}
                  <div className="inputDiv">
                    <label className="inputLabel">Mobile</label>
                    <input
                      value={newMobile}
                      type="text"
                      id="editText"
                      placeholder={user[0].user.Mobile}
                      onChange={(e) => {
                        setNewMobile(e.target.value);
                      }}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="buttonWrapper">
                    <button
                      type="submit"
                      id="submitButton"
                      disabled={
                        (newMobile !== "" &&
                          (newMobile.length < 10 || newMobile.length > 10)) ||
                        newMobile === "" ||
                        newMobile[0] !== "6" ||
                        newMobile[1] !== "9" ||
                        isNaN(newMobile)
                      }
                      onClick={onEditHandler}
                      className="submitButton pure-button pure-button-primary"
                    >
                      <span>Edit Mobile</span>
                    </button>
                  </div>
                </Col>
              </Row>
              <hr />
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
