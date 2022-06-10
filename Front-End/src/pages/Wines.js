import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { GET } from "./Functions/functions";
import "./Wines.css";

const Wines = () => {
  const [wines, setWines] = useState([]);
  const [selectedWineId, setSelectedWineId] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const [alreadyExistInCard, setAlreadyExistInCard] = useState(false);
  const [succesfullyAddedToCard, setSuccesfullyAddedToCard] = useState(false);

  // -------- MODAL
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // --------- Set COOKIES
  const cookies = new Cookies();
  var user = cookies.get("email");
  console.log(cookies.get("card"));

  //------ initial Wines --------------
  const getWines = () => {
    // GET("http://localhost:4000/getWines").then(response =>
    //   console.log(response)
    // );

    fetch("http://localhost:4000/getWines")
      .then((res) => res.json())
      .then((json) => {
        setWines(json);
      });
  };

  useEffect(() => {
    getWines();
  }, []);

  // --------- Add To Card ----------------

  const onAddToCardHandler = (wineArray) => {
    // ----------- save card details to cookies ---------------
    const cookies = new Cookies();
    var isCardEmty = cookies.get("card");

    if (isCardEmty === "" || isCardEmty === undefined) {
      cookies.set("card", wineArray + "," + amount, { path: "/" });
    } else {
      var editedWineArray = wineArray.slice(0, -1);
      if (isCardEmty.includes(editedWineArray)) {
        setAlreadyExistInCard(true);
        setTimeout(() => {
          setAlreadyExistInCard(false);
        }, 3000);
      } else {
        setSuccesfullyAddedToCard(true);
        setTimeout(() => {
          setSuccesfullyAddedToCard(false);
        }, 3000);
        setAlreadyExistInCard(false);
        var newCardCookie = isCardEmty + "|" + wineArray + "," + amount;
        cookies.set("card", newCardCookie, { path: "/" });
      }
    }
    setAmount(0);
    handleClose();
  };

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="modalTitle">
              Add <strong>{selectedWineId.split(",")[1]}</strong> to Card
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Chooce Amount</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              min="1"
              max="20"
              placeholder="Chooce Amount"
            />
            {(amount === 0 || amount < 0 || amount > 20) && (
              <p className="alertMessage">Range 1-20 wines!</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              disabled={
                amount === 0 || amount === "" || amount < 0 || amount > 20
              }
              onClick={() => {
                onAddToCardHandler(selectedWineId);
              }}
            >
              Add to card
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {succesfullyAddedToCard && (
        <Alert className="alertCardMessage" key="danger" variant="success">
          Wine added succesfully to card!
        </Alert>
      )}
      {alreadyExistInCard && (
        <Alert className="alertCardMessage" key="danger" variant="danger">
          This wine Already Exist in Card!
        </Alert>
      )}
      <div className="twoDivs">
        <FontAwesomeIcon
          className="showFilters"
          icon={faFilter}
          size="2x"
          title={showFilter ? "Hide Filters" : "Show Filters"}
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          transform={{ rotate: showFilter ? 42 : 0 }}
        />
        {showFilter && (
          <div className="filters">
            <h4>&nbsp; Search any wine.</h4>

            <Container>
              <Row>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Filter Wine</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Button variant="primary">Search</Button>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                </Form>
              </Row>
            </Container>
          </div>
        )}
        <div className="container">
          <Container>
            {wines.length !== 0 && (
              <Row>
                <Col xs={2}></Col>
                <Col xs={10}></Col>
                {wines.map((item) => (
                  <Col xs={4}>
                    {wines.length !== 0 && (
                      <Container className="item">
                        <div className="card card-body">
                          <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                            <div className="mr-2 mb-3 mb-lg-0">
                              <img className="image" src={item.ImageUrl} />
                            </div>
                            <div className="media-body">
                              <h6 className="media-title font-weight-semibold">
                                <a href={`/wine/${item._id}`} data-abc="true">
                                  {" "}
                                  {item.WineName}
                                </a>
                              </h6>
                              <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.Type}
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.Color}
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.Year}
                                  </a>
                                </li>
                                <br />
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.Location} , {item.Country}
                                  </a>
                                </li>
                              </ul>
                              <p className="mb-3">{item.WineDescription}</p>
                              <ul className="list-inline list-inline-dotted mb-0">
                                <li className="list-inline-item">
                                  {" "}
                                  <strong>Winery by</strong>{" "}
                                  <a href="#" data-abc="true">
                                    {" "}
                                    {item.Winery}{" "}
                                  </a>
                                </li>
                                <br />
                                <li className="list-inline-item">
                                  {" "}
                                  <strong>Grape : </strong> {item.Grapes}{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                              <h3 className="mb-0 font-weight-semibold"> €</h3>
                              <div className="text-muted">
                                {" "}
                                <span className="fa fa-star checked"></span>{" "}
                              </div>
                              <div className="text-muted"> 0 reviews </div>
                              <div className="text-muted"> </div>

                              <Button
                                variant="warning"
                                title="Add to Card"
                                onClick={() => {
                                  setSelectedWineId(
                                    item._id +
                                      "," +
                                      item.WineName +
                                      "," +
                                      item._id +
                                      "," +
                                      item.Color +
                                      "," +
                                      item.Type +
                                      "," +
                                      item.Price +
                                      "," +
                                      item.ImageUrl
                                  );
                                  handleShow(item._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faCartPlus} size="1x" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Container>
                    )}
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Wines;
