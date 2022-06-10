import React from "react";
import { useParams } from "react-router-dom";
import "./BlogInfo.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Button, Container, Row, Col, Form, Modal } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
const BlogInfo = () => {
  const { id } = useParams();
  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const getApliesToQuestion = () =>{
    fetch(`http://localhost:4000/getApliesToQuestion/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        
      });
  }
  useEffect(() => {
    getApliesToQuestion()
  }, []);

  return <div>BlogInfo</div>;
};

export default BlogInfo;
