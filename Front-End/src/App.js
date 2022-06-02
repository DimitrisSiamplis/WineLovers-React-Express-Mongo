import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Footer";
import Navigation from "./Components/Navigation";
import Wines from "./pages/Wines";
import Home from "./pages/Home";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [Email, setEmail] = useState(false);
  const [loginMessage, setLoginMessage] = useState(false);

  const cookies = new Cookies();

  console.log(cookies.get("email"));
  var userEmail = cookies.get("email");

  const handleCallback = (email) => {
    console.log(email);
    setEmail(email);
    setLoginMessage(true);
    setTimeout(() => {setLoginMessage(false)} , 6000);
  };

  const handleLogoutCallback = () => {
    cookies.remove("email");
    setEmail(undefined);
  };

  
  // ------- Initial Check if user is Login ----------
  useEffect(() => {
    if (userEmail) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  // ---------- set that user is login --------------
  useEffect(() => {
    if (userEmail) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [Email]);

  return (
    <div>
      {isLogin && (
        <div>
          <Navigation handleCallback={handleLogoutCallback} />
          {loginMessage && <Alert className="loginAlert" variant="success">User succesfully Login !</Alert>}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/wines">
              <Wines />
            </Route>
          </Switch>
        </div>
      )}
      {isLogin === false && (
        <Container>
          <div className="title">
            <h1>WineLovers</h1>
            <hr />
          </div>
          <Row>
            <Col xs={4}>
              <Login className="login" handleCallback={handleCallback} />
            </Col>
            <Col xs={1}></Col>
            <Col xs={7}>
              <Register />
            </Col>
          </Row>
        </Container>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
