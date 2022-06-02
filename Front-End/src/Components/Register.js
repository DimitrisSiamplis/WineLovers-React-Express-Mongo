import React from "react";
import "./Register.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  const [isOkForRegister, setIsOkForRegister] = useState(true);

  const [isLogin, setIslogin] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      age !== "" &&
      email !== "" &&
      email.length > 4 &&
      password !== "" &&
      password.length > 4 &&
      passwordConfirm !== "" &&
      password === passwordConfirm &&
      address !== "" &&
      number !== "" &&
      phone !== "" &&
      birthday !== ""
    ) {
      setIsOkForRegister(false);
    } else {
      setIsOkForRegister(true);
    }
  }, [
    firstName,
    lastName,
    age,
    email,
    password,
    passwordConfirm,
    address,
    number,
    phone,
  ]);

  const onRegisterHandler = () => {
    console.log(
      firstName,
      lastName,
      age,
      email,
      password,
      passwordConfirm,
      address,
      number,
      phone,
      birthday,
      sex
    );

    var useDetails = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      address: address,
      number: number,
      phone: phone,
      birthday: birthday,
      sex: sex,
    };

    

    fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ useDetails }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.alreadyExist) {
          setIslogin(false);
          alert("this Email already exists");
        } else {
          setIslogin(true);
        }
      });
  };

  const onClearHandler = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setAddress("");
    setNumber("");
    setPhone("");
    setBirthday("");
    setSex("");
  };

  return (
    <div>
      <div className="loginCard">
        <Container>
          <Row>
            <Col xs={6}>
              <p className="loginOrRegister">Register Form</p>
            </Col>
            <Col xs={4}></Col>
            <Col xs={2}></Col>
          </Row>
        </Container>

        <hr />

        <Form>
          <Container>
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    placeholder="Phone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Email"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Comfirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordConfirm}
                    placeholder="Phone"
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                  />
                </Form.Group>
                {password !== "" &&
                  passwordConfirm !== "" &&
                  password !== passwordConfirm && (
                    <p className="alertMessage">Passwords do not match!</p>
                  )}
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="password"
                    value={number}
                    placeholder="Number"
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    placeholder="Birthday"
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setSex(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    placeholder="Age"
                    min="18"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Button
            variant="primary"
            disabled={isOkForRegister}
            onClick={onRegisterHandler}
          >
            Create acount
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;
          <Button variant="warning" onClick={onClearHandler}>
            Clear
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
