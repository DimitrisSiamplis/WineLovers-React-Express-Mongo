import React from "react";
import { useParams } from "react-router-dom";
import "./WineProfile.css";
import { useState, useEffect } from "react";
// import Cookies from "universal-cookie";
import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  differenceInDays,
  diffInHoursFunc,
  diffInMinutesFunc,
  diffInSecFunc,
} from "./Functions/functions";
import Cookies from "universal-cookie";

const WineProfile = () => {
  const { id } = useParams();
  const [wine, setWine] = useState();
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newRate, setNewRate] = useState(0);

  const [faStarIcon, setFaStarIcon] = useState([
    { class: "noSelected", item: 0 },
    { class: "noSelected", item: 1 },
    { class: "noSelected", item: 2 },
    { class: "noSelected", item: 3 },
    { class: "noSelected", item: 4 },
  ]);

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  useEffect(() => {
    let num = faStarIcon.filter(function (e) {
      return e.class !== "noSelected";
    }).length;
    setNewRate(num);
    console.log(num);
  }, [faStarIcon]);
  //-------------- Get Wine info + Comments details ---------------------------
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

  const onCreateCommentHandler = () => {
    console.log(newComment, userEmail, id);
    let commentDetails = {
      newComment: newComment,
      userEmail: userEmail,
      newRate: newRate,
      id: id,
    };
    fetch("http://localhost:4000/newWineComment", {
      method: "POST",
      body: JSON.stringify(commentDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setNewRate(0);
        setNewComment("");
        getWine();
      });
  };

  const onClickOnStarIcon = (item) => {
    var newFaStarIcon = [];
    for (let i = 0; i < 5; i++) {
      if (i < item + 1) {
        newFaStarIcon.push({
          class: "Selected",
          item: i,
        });
      } else {
        newFaStarIcon.push({
          class: "noSelected",
          item: i,
        });
      }
    }
    setFaStarIcon(newFaStarIcon);
  };

  return (
    <div>
      {wine !== undefined && (
        <div className="wine">
          <Container className="item">
            <div className="card card-body">
              <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                <Row>
                  <Col xs={3}>
                    <div className="mr-2 mb-3 mb-lg-0">
                      <img
                        className="wineProfileImage"
                        src={wine.wine.ImageUrl}
                      />
                    </div>
                  </Col>
                  <Col xs={9}>
                    <div>
                      <div className="media-body">
                        <h2 className="wineTitle">{wine.wine.WineName}</h2>

                        <ul className="list-inline list-inline-dotted mb-3 mb-xl-2">
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
                      </div>
                      <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                        <div className="text-muted">
                          {" "}
                          {wine.Comments.length} reviews{" "}
                        </div>
                        <div className="text-muted">
                          Total rate :{" "}
                          {wine.total_rating === null
                            ? 0
                            : wine.total_rating.toFixed(2)}{" "}
                          <FontAwesomeIcon
                            className="starIcon"
                            icon={faStar}
                            size="1x"
                          />{" "}
                        </div>
                        <br />
                        {/* <h3 className="mb-0 font-weight-semibold">
                          {" "}
                          Price : {wine.wine.Price}€
                        </h3> */}

                        <ul className="list-inline list-inline-dotted mb-0">
                          <li className="list-inline-item">
                            {" "}
                            <strong>Grape : </strong> {wine.wine.Grapes}{" "}
                          </li>
                          <br />
                          <li className="list-inline-item">
                            {" "}
                            <strong>Winery by</strong>{" "}
                            <a
                              target="_blank"
                              href={`https://www.google.com/search?q=${wine.wine.Winery}`}
                              data-abc="true"
                            >
                              {" "}
                              {wine.wine.Winery}{" "}
                            </a>
                          </li>
                          <br /> <br />
                        </ul>
                        <strong>Wine discription</strong>
                        <p className="mb-3">{wine.wine.WineDescription}</p>

                        <Button variant="warning" title="Add to Card">
                          {/* <FontAwesomeIcon icon={faCartPlus} size="1x" /> */}
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="rowComment">
                  {/* <Col xs={2}></Col> */}
                  <Col xs={12}>
                    <div>
                      <br />
                      <span className="badge bg-white d-flex flex-row align-items-center">
                        <span className="text-primary">
                          Comments {showComments ? "ON" : "OFF"}{" "}
                        </span>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            defaultChecked={true}
                            onChange={(e) => {
                              setShowComments(e.target.checked);
                            }}
                          />
                        </div>
                      </span>
                      {showComments && (
                        <div>
                          <h5>Comments & Rating</h5>
                          <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                            <textarea
                              className="form-control mr-3"
                              placeholder="Leave comment"
                              value={newComment}
                              onChange={(e) => {
                                setNewComment(e.target.value);
                              }}
                            ></textarea>
                          </div>
                          <Form.Label>Rate&nbsp;wine&nbsp; </Form.Label>
                          <br />
                          {faStarIcon.map((icon) => (
                            <FontAwesomeIcon
                              className={icon.class}
                              icon={faStar}
                              size="1x"
                              onClick={() => onClickOnStarIcon(icon.item)}
                            />
                          ))}

                          <strong>&nbsp;&nbsp;{newRate} / 5 rating</strong>

                          <br />
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled={
                              newComment.trim() === "" ||
                              newComment.trim().length > 300 ||
                              newRate === 0
                            }
                            onClick={onCreateCommentHandler}
                          >
                            Comment
                          </button>
                          <hr />
                          {wine.Comments.map((comment) => (
                            <div className="commented-section mt-2">
                              <div className="d-flex flex-row align-items-center commented-user">
                                <h5 className="mr-2">{comment.user.Name}</h5>
                                &nbsp;
                                <span className="dot mb-1"></span>
                                &nbsp;
                                <span className="mb-1 ml-2">
                                  {differenceInDays(
                                    comment.comment.CommentDate
                                  ) == 0
                                    ? diffInHoursFunc(
                                        comment.comment.CommentDate
                                      ) === 0
                                      ? diffInMinutesFunc(
                                          comment.comment.CommentDate
                                        ) === 0
                                        ? diffInSecFunc(
                                            comment.comment.CommentDate
                                          ) + " seconds"
                                        : diffInMinutesFunc(
                                            comment.comment.CommentDate
                                          ) + " minutes"
                                      : diffInHoursFunc(
                                          comment.comment.CommentDate
                                        ) + " hours"
                                    : differenceInDays(
                                        comment.comment.CommentDate
                                      ) + " days"}{" "}
                                  ago
                                </span>
                              </div>
                              <div className="comment-text-sm">
                                <span>{comment.comment.Comment}</span>
                              </div>
                              <div>
                                <span>
                                  <strong>
                                    {" "}
                                    Rate : {comment.comment.Rating}{" "}
                                    <FontAwesomeIcon
                                      className="starIcon"
                                      icon={faStar}
                                      size="1x"
                                    />
                                  </strong>
                                </span>
                              </div>
                              <div className="reply-section">
                                <div className="d-flex flex-row align-items-center voting-icons">
                                  <i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                                  <i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                                </div>
                              </div>
                              <hr />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default WineProfile;
