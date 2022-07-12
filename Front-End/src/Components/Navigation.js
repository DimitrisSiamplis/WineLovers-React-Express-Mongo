import React from "react";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartPlus,
  faUser,
  faClock,
  faBlog,
  faWineBottle,
  faSun,
  faMoon,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const Navigation = (props) => {
  const [userDetails, setUseretails] = useState([]);
  const [nightOrLight, setNightOrLight] = useState("light");

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const onTriger = () => {
    props.handleCallback();
  };

  const getUser = () => {
    fetch(`http://localhost:4000/getUser/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        console.log([json]);
        setUseretails([json]);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const onSunHandler = () => {
    setNightOrLight("light");
    props.darkOrLightCallback("light");
  };

  const onDarkHandler = () => {
    setNightOrLight("night");
    props.darkOrLightCallback("night");
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">WineLovers</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          &nbsp;&nbsp;
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/wines">
                Wines &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faWineBottle}
                  size="lg"
                />{" "}
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link href="/card">
                Card &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faCartPlus}
                  size="lg"
                />{" "}
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link href="/history">
                History &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faClock}
                  size="lg"
                />{" "}
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link href="/blog">
                Blog &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faBlog}
                  size="lg"
                />{" "}
              </Nav.Link>
              &nbsp;&nbsp;
              <Nav.Link href="/foodAndWine">
                Food & Wine &nbsp;
                <FontAwesomeIcon
                  className="faIcons"
                  icon={faUtensils}
                  size="lg"
                />{" "}
              </Nav.Link>
              &nbsp;&nbsp;
              <NavDropdown title="More" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/helpUs">Help Us</NavDropdown.Item>

                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="/wineGuide">
                  Wine Guide
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/profile">
                Profile &nbsp;{" "}
                <FontAwesomeIcon className="faIcons" icon={faUser} size="lg" />{" "}
              </Nav.Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <NavDropdown title="Settings" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/changePassword">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="/editProfile">
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/addWine">Add Wine</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    onTriger();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link className="loginUs">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Nav.Link>
            </Nav>
            <Nav>
              {userDetails.length !== 0 && (
                <Nav.Link className="loginUs">
                  {userDetails[0].user.Name}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
