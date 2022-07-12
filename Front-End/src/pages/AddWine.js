import React from "react";
import "./AddWine.css";
import { Container, Col, Row, Button, Modal, Alert } from "react-bootstrap";
import { useState } from "react";


const AddWine = () => {
  const allGrapes = [
    "Prosecco",
    "Malagouzia",
    "Asurtiko",
    "Xinomauro",
    "Sauvignon Blanc",
    "Mosxofilero",
    "Chardonnay",
    "Merlot",
    "Cabernet Sauvignon",
    "Mosxato",
    "Agiorgitiko",
    "Maurodafni",
    "Ponot Noir",
    "Roditis",
    "Pinot Grigio",
    "Malbec",
  ];
  const allTypes = ["Dry", "Semi-sweet", "Sweet", "Semi-dry"];
  const allColors = ["Red", "White", "Roze"];
  var allyears = [];
  for (let i = 1950; i < new Date().getFullYear() + 1; i++) {
    allyears.push(i);
  }

  const [wineName, setWineName] = useState("");
  const [Type, setType] = useState(allTypes[0]);
  const [color, setColor] = useState(allColors[0]);
  const [year, setYear] = useState(allyears[0]);
  const [grape, setGrape] = useState(allGrapes[0]);
  const [winery, setWinery] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [discription, setDiscription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [show, setShow] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClearHandler = () => {
    setWineName("");
    setType(allTypes[0]);
    setColor(allColors[0]);
    setYear(allyears[0]);
    setGrape(allGrapes[0]);
    setWinery("");
    setPrice("");
    setCountry("");
    setLocation("");
    setDiscription("");
    setImageURL("");
  };

  const onAddWineHandler = () => {
    // handleClose();
    // console.log(
    //   wineName,
    //   Type,
    //   color,
    //   year,
    //   grape,
    //   winery,
    //   price,
    //   country,
    //   location,
    //   discription,
    //   imageURL
    // );

    let wineDetails = {
      wineName: wineName,
      Type: Type,
      color: color,
      year: year,
      grape: grape,
      winery: winery,
      price: price,
      country: country,
      location: location,
      discription: discription,
      imageURL: imageURL,
    };
    fetch("http://localhost:4000/addWine", {
      method: "POST",
      body: JSON.stringify(wineDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        handleClose();
        setActiveAlert(true)
        setTimeout(() => {
            setActiveAlert(false)
          }, 4000);
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Your Wine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <br />
          <br />
          <Row>
            <Col xs={3}>
              <div className="mr-2 mb-3 mb-lg-0">
                &nbsp; &nbsp; &nbsp;
                <img className="wineProfileImage" src={imageURL} />
              </div>
            </Col>
            <Col xs={9}>
              <div>
                <div className="media-body">
                  <h2 className="wineTitle">{wineName}</h2>

                  <ul className="list-inline list-inline-dotted mb-3 mb-xl-2">
                    <li className="list-inline-item">
                      <a href="#" className="text-muted" data-abc="true">
                        {Type}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-muted" data-abc="true">
                        {color}
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-muted" data-abc="true">
                        {year}
                      </a>
                    </li>
                    <br />
                    <li className="list-inline-item">
                      <a href="#" className="text-muted" data-abc="true">
                        {location} , {country}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                  <br />
                  {/* <h3 className="mb-0 font-weight-semibold">
                          {" "}
                          Price : {wine.wine.Price}€
                        </h3> */}

                  <ul className="list-inline list-inline-dotted mb-0">
                    <li className="list-inline-item">
                      {" "}
                      <strong>Grape : </strong> {grape}{" "}
                    </li>
                    <br />
                    <li className="list-inline-item">
                      {" "}
                      <strong>Winery by</strong>{" "}
                      <a
                        target="_blank"
                        href={`https://www.google.com/search?q=${winery}`}
                        data-abc="true"
                      >
                        {" "}
                        {winery}{" "}
                      </a>
                    </li>
                    <br /> <br />
                  </ul>
                  <strong>Wine discription</strong>
                  <p className="mb-3">{discription}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onAddWineHandler}>
            Save Wine
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mainDiv">
        <div className="cardStyle addWine">
          <h2 className="formTitle">Add Wine</h2>

          {activeAlert && (
            <Alert key="success" variant="success">
              Wine succesfully added.
            </Alert>
          )}
          <Container>
            <Row>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Wine Name</label>
                  <input
                    type="text"
                    id="password"
                    value={wineName}
                    onChange={(e) => {
                      setWineName(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Winery</label>
                  <input
                    type="text"
                    id="password"
                    value={winery}
                    onChange={(e) => {
                      setWinery(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Type</label>
                  <select
                    className="selectGrape"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    {allTypes.map((type) => (
                      <option value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Color</label>
                  <select
                    className="selectGrape"
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  >
                    {allColors.map((color) => (
                      <option value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Year</label>
                  <select
                    className="selectGrape"
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  >
                    {allyears.reverse().map((years) => (
                      <option value={years}>{years}</option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Price</label>
                  <input
                    type="text"
                    id="password"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Country</label>
                  <input
                    type="text"
                    id="password"
                    value={country}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setCountry(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Location</label>
                  <input
                    type="text"
                    id="password"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <div className="inputDiv">
                  <label className="inputLabel">Grapes</label>
                  <select
                    className="selectGrape"
                    onChange={(e) => {
                      setGrape(e.target.value);
                    }}
                  >
                    {allGrapes.map((grape) => (
                      <option value={grape}>{grape}</option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={4}>
                {" "}
                <div className="inputDiv">
                  <label className="inputLabel">Discription</label>
                  <input
                    className="wineDiscription"
                    type="text"
                    id="password"
                    value={discription}
                    onChange={(e) => {
                      setDiscription(e.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col xs={4}></Col>
              <Col xs={4}>
                {" "}
                <div className="inputDiv">
                  <label className="inputLabel">Image Url</label>
                  <input
                    type="text"
                    id="password"
                    value={imageURL}
                    onChange={(e) => {
                      setImageURL(e.target.value);
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
          <br />
          <Container>
            <Row>
              <Col xs={4}></Col>
              <Col xs={1}>
                {" "}
                <Button variant="danger" onClick={onClearHandler}>
                  &nbsp;&nbsp;Clear&nbsp;&nbsp;
                </Button>
              </Col>
              <Col xs={2}></Col>
              <Col xs={1}>
                {" "}
                <Button
                  variant="success"
                  onClick={handleShow}
                  disabled={
                    wineName === "" ||
                    winery === "" ||
                    price.trim() === "" ||
                    country.trim() === "" ||
                    location.trim() === "" ||
                    discription.trim() === "" ||
                    imageURL.trim() === ""
                  }
                >
                  Add&nbsp;Wine
                </Button>
              </Col>
              <Col xs={3}></Col>
            </Row>
          </Container>

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default AddWine;
