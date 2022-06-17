import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
// import { useEffect } from "react";
import "./Login.css";
import Cookies from "universal-cookie";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [testLogin, setTestLogin] = useState(true);

  const onTriger = (email) =>{
    props.handleCallback(email)
  }

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
          
          setTestLogin(true);
          const cookies = new Cookies();
          cookies.set("email", json.email, { path: "/" });
          console.log(cookies.get("email"));
          onTriger(json.email)
          
        } else {
          alert("Error logim");
          setTestLogin(false);
        }
      });
  };

  return (
    <div>
      <div className="loginCard">
        <Container>
          <Row>
            <Col xs={6}>
              <p className="loginOrRegister">Login&nbsp;Form</p>
            </Col>
            <Col xs={4}></Col>
            <Col xs={2}></Col>
          </Row>
        </Container>

        <hr />

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
              <p className="alertMessage">
                Email must include at least 5 characters!
              </p>
            )}
            {!testLogin && (
              <p className="alertMessage">
                Email or Password are incorect!Try again!
              </p>
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
          <Button
            variant="primary"
            onClick={isLogin}
            disabled={email === "" || password === "" || email.length < 5}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
