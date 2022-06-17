import React from "react";

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
import { faStar } from "@fortawesome/free-solid-svg-icons";
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

  const { innerWidth: width, innerHeight: height } = window;

  //------ initial Wines --------------
  const getWines = () => {
    // GET("http://localhost:4000/getWines").then(response =>
    //   console.log(response)
    // );

    fetch("http://localhost:4000/getWines")
      .then((res) => res.json())
      .then((json) => {
        console.log([json]);

        setWines([json]);
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
                    <Form.Control type="text" placeholder="Filter Wine" />
                  </Form.Group>

                  <Form.Label>Wine Type</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option value="1">Ξηρο</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>

                  <Form.Label>Wine Color</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option value="1">Red</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>

                  <br/>
                  <Form.Label>Min Price Range</Form.Label>
                  <Form.Range />
                  <Form.Label>Max Price Range</Form.Label>
                  <Form.Range />

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Search by top rates" />
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
                {/* <Col xs={2}></Col>
                <Col xs={10}></Col> */}
                {wines[0].wines.map((item) => (
                  <Col xs={width < 1000 ? (width < 700 ? 12 : 6) : 4}>
                    {wines.length !== 0 && (
                      <Container className="item">
                        <div className="card card-body">
                          <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                            <div className="mr-2 mb-3 mb-lg-0">
                              <img className="image" src={item.wine.ImageUrl} />
                            </div>
                            <div className="media-body">
                              <h6 className="media-title font-weight-semibold">
                                <a
                                  href={`/wine/${item.wine._id}`}
                                  data-abc="true"
                                >
                                  {" "}
                                  {item.wine.WineName}
                                </a>
                              </h6>
                              <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.wine.Type}
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.wine.Color}
                                  </a>
                                </li>
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.wine.Year}
                                  </a>
                                </li>
                                <br />
                                <li className="list-inline-item">
                                  <a
                                    href="#"
                                    className="text-muted"
                                    data-abc="true"
                                  >
                                    {item.wine.Location} , {item.wine.Country}
                                  </a>
                                </li>
                              </ul>
                              <p className="mb-3">
                                {item.wine.WineDescription}
                              </p>
                              <ul className="list-inline list-inline-dotted mb-0">
                                <li className="list-inline-item">
                                  {" "}
                                  <strong>Winery by</strong>{" "}
                                  <a href="#" data-abc="true">
                                    {" "}
                                    {item.wine.Winery}{" "}
                                  </a>
                                </li>
                                <br />
                                <li className="list-inline-item">
                                  {" "}
                                  <strong>Grape : </strong> {item.wine.Grapes}{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                              <h3 className="mb-0 font-weight-semibold"> €</h3>
                              <h6 className="mb-0 font-weight-semibold">
                                {" "}
                                {item.sum_total_rate}{" "}
                                <FontAwesomeIcon
                                  className="starIcon"
                                  icon={faStar}
                                  size="1x"
                                />
                              </h6>
                              <div className="text-muted">
                                {" "}
                                <span className="fa fa-star checked"></span>{" "}
                              </div>
                              <div className="text-muted">
                                {" "}
                                {item.number_of_rate} reviews{" "}
                              </div>
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
