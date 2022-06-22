import React from "react";
import { useHistory } from "react-router-dom";
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
  PageItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Wines.css";

const Wines = () => {
  let history = useHistory();

  const [initialWines, setInitialWines] = useState([]);
  const [wines, setWines] = useState([]);
  const [selectedWineId, setSelectedWineId] = useState("");
  const [showFilter, setShowFilter] = useState(true);
  const [alreadyExistInCard, setAlreadyExistInCard] = useState(false);
  const [succesfullyAddedToCard, setSuccesfullyAddedToCard] = useState(false);

  const [colorWines, setColorWines] = useState([]);
  const [typeWines, setTypeWines] = useState([]);
  const [yearWines, setYearWines] = useState([]);

  // ------------FIlter Hooks -----------------------------
  const [wineSearch, setWineSearch] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineColor, setWineColor] = useState("");
  const [wineYear, setWineYear] = useState("");
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(5);
  const [maxInitialPrice, setMaxInitialPrice] = useState();
  const [minInitialPrice, setMinInitialPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();

  const [searchByMaxPrice, setByMaxPrice] = useState(false);
  const [searchByMaxRate, setByMaxRate] = useState(false);

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
    fetch("http://localhost:4000/getWines")
      .then((res) => res.json())
      .then((json) => {
        console.log(json.wines);

        setWines([json]);
        setInitialWines([json]);

        var colors = [];
        var types = [];
        var years = [];
        var prices = [];
        for (const key in json.wines) {
          colors.push(json.wines[key].wine.Color);
          types.push(json.wines[key].wine.Type);
          years.push(json.wines[key].wine.Year);
          prices.push(json.wines[key].wine.Price);
        }
        setMaxInitialPrice(Math.max.apply(Math, prices));
        setMinInitialPrice(Math.min.apply(Math, prices));
        setMinPrice(Math.min.apply(Math, prices));
        setMaxPrice(Math.max.apply(Math, prices));
        colors = [...new Set(colors)];
        types = [...new Set(types)];
        years = [...new Set(years)];
        setColorWines(colors);
        setTypeWines(types);
        setYearWines(years);
      });
  };

  useEffect(() => {
    getWines();
  }, []);

  const filterWines = () => {
    var oldWines = initialWines;

    var newWineArray = [];
    var newArray = oldWines[0].wines.filter(function (el) {
      return (
        el.wine.WineName.includes(wineSearch) &&
        el.wine.Color.includes(wineColor) &&
        el.wine.Type.includes(wineType) &&
        String(el.wine.Year).includes(wineYear) &&
        el.sum_total_rate < maxRate &&
        el.sum_total_rate >= minRate &&
        el.wine.Price <= maxPrice &&
        el.wine.Price >= minPrice
      );
    });

    if (searchByMaxPrice) {
      newArray.sort((a, b) => {
        return b.wine.Price - a.wine.Price;
      });
    }

    if (searchByMaxRate) {
      newArray.sort((a, b) => {
        return b.sum_total_rate - a.sum_total_rate;
      });
    }
    console.log(newArray);

    newWineArray.push({ wines: newArray });
    setWines(newWineArray);
    window.scrollTo(0, 0);
  };

  const onClearHandler = () => {
    setWineSearch("");
    setWineType("");
    setWineColor("");
    setWineYear("");
    setMinRate(0);
    setMaxRate(5);
    setMaxPrice(maxInitialPrice);
    setMinPrice(minInitialPrice);
    setByMaxPrice(false);
    setByMaxRate(false);
    setWines(initialWines);
    window.scrollTo(0, 0);
  };

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
                    <Form.Control
                      type="text"
                      placeholder="Filter Wine"
                      value={wineSearch}
                      onChange={(e) => {
                        setWineSearch(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Label>Wine Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setWineType(e.target.value);
                    }}
                  >
                    <option value="">Ξηρο..</option>
                    {typeWines.map((type) => (
                      <option value={type}>{type}</option>
                    ))}
                  </Form.Select>
                  <Form.Label>Wine Color</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setWineColor(e.target.value);
                    }}
                  >
                    <option value="">Red/White/Roze..</option>
                    {colorWines.map((color) => (
                      <option value={color}>{color}</option>
                    ))}
                  </Form.Select>
                  <Form.Label>Wine Year</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setWineYear(e.target.value);
                    }}
                  >
                    <option value="">2000/2010/2020..</option>
                    {yearWines.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </Form.Select>
                  <br />
                  <Row>
                    <Col xs={6}>
                      <Form.Label>Min Rate Range</Form.Label>
                      <Form.Range
                        min="0"
                        max="5"
                        value={minRate}
                        onChange={(e) => {
                          if (maxRate > e.target.value) {
                            setMinRate(e.target.value);
                          }
                        }}
                      />
                      <strong>
                        {minRate}
                        <FontAwesomeIcon
                          className="starIcon"
                          icon={faStar}
                          size="1x"
                        />
                      </strong>
                    </Col>

                    <Col xs={6}>
                      {" "}
                      <Form.Label>Max Rate Range</Form.Label>
                      <Form.Range
                        min="0"
                        max="5"
                        value={maxRate}
                        onChange={(e) => {
                          if (minRate < e.target.value) {
                            setMaxRate(e.target.value);
                          }
                        }}
                      />
                      <strong>
                        {maxRate}
                        <FontAwesomeIcon
                          className="starIcon"
                          icon={faStar}
                          size="1x"
                        />
                      </strong>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={6}>
                      <Form.Label>Min Price Price</Form.Label>
                      <Form.Range
                        min={minInitialPrice}
                        max={maxInitialPrice}
                        value={
                          minPrice === minInitialPrice
                            ? minInitialPrice
                            : minPrice
                        }
                        onChange={(e) => {
                          if (maxPrice > e.target.value) {
                            setMinPrice(e.target.value);
                          }
                        }}
                      />
                      <strong>{minPrice} €</strong>
                    </Col>
                    <Col xs={6}>
                      {" "}
                      <Form.Label>Max Price Price</Form.Label>
                      <Form.Range
                        min={minInitialPrice}
                        max={maxInitialPrice}
                        value={
                          maxPrice === maxInitialPrice
                            ? maxInitialPrice
                            : maxPrice
                        }
                        onChange={(e) => {
                          if (minPrice < e.target.value) {
                            setMaxPrice(e.target.value);
                          }
                        }}
                      />
                      <strong>{maxPrice} €</strong>
                    </Col>
                  </Row>
                  <br />
                  <hr />
                  <div className="rateCheckBox">
                    <input
                      type="checkbox"
                      checked={searchByMaxPrice}
                      onChange={(e) => {
                        setByMaxPrice(e.target.checked);
                      }}
                    />
                    <label className="rateLabel">
                      &nbsp;Search&nbsp;by&nbsp;max&nbsp;price.
                    </label>
                  </div>
                  <div className="rateCheckBox">
                    <input
                      type="checkbox"
                      checked={searchByMaxRate}
                      onChange={(e) => {
                        setByMaxRate(e.target.checked);
                      }}
                    />
                    <label className="rateLabel">
                      &nbsp;Search&nbsp;by&nbsp;max&nbsp;rate.
                    </label>
                  </div>
                  <br />
                  <br />
                  <Row>
                    <Col xs={4}>
                      <Button variant="warning" onClick={onClearHandler}>
                        Clear
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button variant="success" onClick={filterWines}>
                        Search
                      </Button>
                    </Col>
                  </Row>
                  &nbsp;
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
                        <div
                          className="card card-body wine"
                          onClick={() => {
                            console.log(item.wine._id);
                            history.push("/wine/" + item.wine._id);
                          }}
                        >
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
                              {/* <p className="mb-3">
                                {item.wine.WineDescription}
                              </p> */}
                              <ul className="list-inline list-inline-dotted mb-0">
                                <li className="list-inline-item">
                                  {" "}
                                  <strong>Grape : </strong> {item.wine.Grapes}{" "}
                                </li>
                                <br />
                                <li className="list-inline-item">
                                  {" "}
                                  <strong>Winery by</strong>{" "}
                                  <a href="#" data-abc="true">
                                    {" "}
                                    {item.wine.Winery}{" "}
                                  </a>
                                </li>
                                <br />
                              </ul>
                            </div>
                            <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                              <h3 className="mb-0 font-weight-semibold">
                                {item.wine.Price} €
                              </h3>
                              <h6 className="mb-0 font-weight-semibold">
                                {" "}
                                {Math.round(item.sum_total_rate * 100) /
                                  100}{" "}
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Wines;
