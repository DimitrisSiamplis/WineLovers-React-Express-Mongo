import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = () => {
    let userDetails = {
      email: email,
      password: password,
    };
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
       
        if (json.status === true) {
          alert("Successful Lofin")
        } else {
          alert("Error Login")
        }
      });
  };



  return (
    <div>
      <div className="title">
        <h1>WineLovers</h1>
        <hr />
      </div>
      <div className="loginCard">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {email.length > 0 && email.length < 5 && (
              <p className="alertMessage">Email must include at least 5 characters!</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" onClick={isLogin} disabled={ email === "" || password ==="" ||  email.length < 5}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
