import React from "react";
import { useParams } from "react-router-dom";
import "./BlogInfo.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
// import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
import { differenceInDays } from "./Functions/functions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
const BlogInfo = () => {
  const [blogInfo, setBlogInfo] = useState([]);
  const [user, setUser] = useState([]);
  const [apply, setApply] = useState("");
  const { id } = useParams();
  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  // ----------- get aplies To question with spesific id -----------
  const getApliesToQuestion = () => {
    fetch(`http://localhost:4000/getApliesToQuestion/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setBlogInfo([json]);
      });
  };

  // --------------- get user details -----------
  const getUser = (email) => {
    var emailForSearch = email === undefined ? userEmail : email;
    fetch(`http://localhost:4000/getUser/${emailForSearch}`)
      .then((res) => res.json())
      .then((json) => {
        setUser([json]);
        console.log([json]);
      });
  };

  useEffect(() => {
    getApliesToQuestion();
    getUser();
  }, []);

  const applyToQuestion = () => {};

  // ----------- on Apply Handler -------------
  const onApplyHandler = () => {

    let applyDetails = {
      apply: apply.trim(),
      blogQuestionId: blogInfo[0].blogQuestions[0]._id,
      userId: user[0].user._id,
      userName: user[0].user.Name,
      userEmail: user[0].user.Email,
    };
    fetch("http://localhost:4000/applyToQuestion", {
      method: "POST",
      body: JSON.stringify(applyDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        getApliesToQuestion();
      });
  };

  return (
    <div>
      <div className="container py-4">
        <div className="col-md-10 col-lg-8 m-auto">
          {blogInfo.length !== 0 && user.length !== 0 && (
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h4 className="mb-4">
                {blogInfo[0].aplyQuestion.length}&nbsp; Comments
              </h4>

              <div className="">
                <div className="py-3">
                  <div className="d-flex comment">
                    <img
                      className="rounded-circle me-3"
                      src={`https://via.placeholder.com/128/${Math.floor(
                        Math.random() * 16777215
                      ).toString(16)}/ffcbde.png?text=${
                        user[0].user.Name.split(" ")[0][0] +
                        user[0].user.Name.split(" ")[1][0]
                      }`}
                    />
                    <div className="flex-grow-1 ms-3">
                      <div className="mb-1">
                        <a href="#" className="fw-bold link-dark me-1">
                          {blogInfo[0].blogQuestions[0].UserName}
                        </a>{" "}
                        <span className="text-muted text-nowrap">
                          {differenceInDays(
                            blogInfo[0].blogQuestions[0].QuestionDate
                          )}{" "}
                          days ago
                        </span>
                      </div>
                      <div className="mb-2">
                        {blogInfo[0].blogQuestions[0].Question}
                      </div>
                      <div className="hstack align-items-center mb-2">
                        <a className="link-primary me-2" href="#">
                          <i className="zmdi zmdi-thumb-up"></i>
                        </a>
                        <span className="me-3 small">55</span>
                        <a className="link-secondary me-4" href="#">
                          <i className="zmdi zmdi-thumb-down"></i>
                        </a>
                        {/* <a className="link-secondary small" href="#">
                          REPLY
                        </a> */}
                        <a className="link-danger small ms-3" href="#">
                          DELETE
                        </a>
                      </div>
                      {/* <a className="fw-bold d-flex align-items-center" href="#">
                        <i className="zmdi zmdi-chevron-down fs-4 me-3"></i>
                        <span>Hide Replies</span>
                      </a> */}
                    </div>
                  </div>

                  <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                    <div className="d-flex">
                      <img
                        className="rounded-circle me-3"
                        src={`https://via.placeholder.com/128/${Math.floor(
                          Math.random() * 16777215
                        ).toString(16)}/ffcbde.png?text=${
                          user[0].user.Name.split(" ")[0][0] +
                          user[0].user.Name.split(" ")[1][0]
                        }`}
                      />
                      <div className="flex-grow-1">
                        <div className="hstack gap-2 mb-1">
                          <a href="#" className="fw-bold link-dark"></a>
                        </div>

                        <div className="form-floating mb-3">
                          <textarea
                            className="form-control w-100"
                            placeholder="Leave a comment here"
                            value={apply}
                            onChange={(e) => {
                              setApply(e.target.value);
                            }}
                            required
                          ></textarea>
                          <label>Aplie here...</label>
                        </div>
                        <div className="hstack justify-content-end gap-2">
                          <button
                            disabled={apply.trim() === ""}
                            className="btn btn-sm btn-primary text-uppercase"
                            onClick={onApplyHandler}
                          >
                            comment
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="comment-replies mt-4 bg-light p-3 rounded">
                      <h6 className="mb-4">
                        {/* {{number.number}}  */}
                        {blogInfo[0].aplyQuestion.length}&nbsp; Aplies to{" "}
                        {blogInfo[0].blogQuestions[0].UserName}
                        <strong>{/* {{number.name}} */}</strong>{" "}
                      </h6>

                      {blogInfo[0].aplyQuestion.map((aply) => (
                        <div className="d-flex py-2">
                          <img
                            className="rounded-circle me-3"
                            src={`https://via.placeholder.com/128/${Math.floor(
                              Math.random() * 16777215
                            ).toString(16)}/7f00ff.png?text=${
                              aply.AplierName[0] +
                              aply.AplierName.split(" ")[1][0]
                            }`}
                          />
                          <div className="flex-grow-1 ms-3">
                            <div className="mb-1">
                              <a
                                href="/profilInfo/{{this.AplierId}}"
                                className="fw-bold link-dark pe-1"
                              >
                                {aply.AplierName}
                              </a>{" "}
                              <span className="text-muted text-nowrap">
                                {differenceInDays(aply.AplyDate)} day ago
                              </span>
                            </div>
                            <div className="mb-2">{aply.Aply}</div>
                            <div className="hstack align-items-center">
                              <a className="link-secondary me-2" href="#">
                                <i className="zmdi zmdi-thumb-up"></i>
                              </a>
                              {/* <span className="me-3 small">1</span> */}
                              <a className="link-secondary me-4" href="#">
                                <i className="zmdi zmdi-thumb-down"></i>
                              </a>
                              {/* <a className="link-secondary small" href="#">
                                REPLY
                              </a> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogInfo;
