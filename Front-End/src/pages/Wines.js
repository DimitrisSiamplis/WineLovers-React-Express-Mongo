import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import "./Wines.css";

const Wines = () => {
  const [wines, setWines] = useState([]);

  const getWines = () => {
    fetch("http://localhost:4000/getWines")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setWines(json);
      });
  };
  useEffect(() => {
    getWines();
  }, []);

  console.log(wines);

  return (
    <div className="twoDivs">
      <div className="filters">
          <h4>&nbsp; Search any wine.</h4>
        
        <Container>
          <Row>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary">Search</Button>
            </Form>
          </Row>
        </Container>
      </div>

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

                            <form action="/auth/addToCard" method="POST">
                              <input name="wineId" type="text" hidden />
                              <input
                                name="amount"
                                placeholder="Choose Amount"
                                type="number"
                                min="0"
                                required
                              />{" "}
                              <br />
                              <button
                                type="submit"
                                className="btn btn-warning mt-4 text-white"
                              >
                                <i className="icon-cart-add mr-2"></i> Add to
                                cart
                              </button>
                            </form>
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
  );
};

export default Wines;
