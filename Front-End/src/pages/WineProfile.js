import React from "react";
import { useParams } from "react-router-dom";
import "./WineProfile.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const WineProfile = () => {
  const { id } = useParams();
  const [wine, setWine] = useState();

  const getWine = () => {
    fetch("http://localhost:4000/getWine/" + id)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setWine(json);
      });
  };
  useEffect(() => {
    getWine();
  }, []);

  return (
    <div>
      {wine !== undefined && (
        <div className = 'wine'>
          <Container>
            <Row>
              <Col xs={12}>
                <Container className="item">
                  <div className="card card-body">
                    <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                      <div className="mr-2 mb-3 mb-lg-0">
                        <img className="wineImage" src={wine.wine.ImageUrl} />
                      </div>
                      <div className="media-body">
                        <h6 className="media-title font-weight-semibold">
                          <a href={`/wine/${wine.wine._id}`} data-abc="true">
                            {" "}
                            {wine.wine.WineName}
                          </a>
                        </h6>
                        <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                          <li className="list-inline-item">
                            <a href="#" className="text-muted" data-abc="true">
                              {wine.wine.Type}
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="text-muted" data-abc="true">
                              {wine.wine.Color}
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="text-muted" data-abc="true">
                              {wine.wine.Year}
                            </a>
                          </li>
                          <br />
                          <li className="list-inline-item">
                            <a href="#" className="text-muted" data-abc="true">
                              {wine.wine.Location} , {wine.wine.Country}
                            </a>
                          </li>
                        </ul>
                        <p className="mb-3">{wine.wine.WineDescription}</p>
                        <ul className="list-inline list-inline-dotted mb-0">
                          <li className="list-inline-item">
                            {" "}
                            <strong>Winery by</strong>{" "}
                            <a href="#" data-abc="true">
                              {" "}
                              {wine.wine.Winery}{" "}
                            </a>
                          </li>
                          <br />
                          <li className="list-inline-item">
                            {" "}
                            <strong>Grape : </strong> {wine.wine.Grapes}{" "}
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

                        <Button variant="warning" title="Add to Card">
                          {/* <FontAwesomeIcon icon={faCartPlus} size="1x" /> */}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default WineProfile;
