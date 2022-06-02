import React from 'react'
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <Container>
            <Row>
                <h5 className='footerTitle'>WineLovers Official Website - Find any wine!</h5>
            </Row>
            <hr />
            <Row>
                <Col xs = {4}>
                    <h6>About Us</h6>
                </Col>
                <Col xs = {4}><h6>Contact Us</h6></Col>
                <Col xs = {4}><h6>News</h6></Col>
            </Row>
        </Container>
    </div>
  )
}

export default Footer