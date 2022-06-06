import React from "react";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

const Navigation = (props) => {
  const onTriger = () => {
    
    props.handleCallback();
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
              <NavDropdown title="Actions" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">Help Us</NavDropdown.Item>

                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item href="#action/3.4">
                  Statistics
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
                <NavDropdown.Item href="#action/3.1">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Add Wine</NavDropdown.Item>

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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
