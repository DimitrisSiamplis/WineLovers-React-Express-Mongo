import React from "react";
import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Card = () => {
  const [card, setCard] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  // --------- date formater --------------------
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  //-------------- get Card --------------------
  const getCard = () => {
    let userDetails = {
      email: userEmail,
    };
    fetch("http://localhost:4000/getCard", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setCard(json);
      });
  };
  useEffect(() => {
    getCard();
  }, []);

  useEffect(() => {
    if (card.length !== 0) {
      var total = 0;
      card.card.map((item) => {
        total = total + item.card.Amount * item.wine.Price;
      });
      setTotalPrice(total);
    }
  }, [card]);

  return (
    <div>
      <div className="cardboth">
        <div className="product-details mr-2">
          <div className="d-flex flex-row align-items-center">
            <i className="fa fa-long-arrow-left"></i>
            <button
              //   style="padding: 0; border: none; background: none;"
              className="ml-2"
            >
              Continue Shopping
            </button>
          </div>
          <hr />
          <h6 className="mb-0">Shopping cart</h6>
          {card.length !== 0 && (
            <div>
              <div className="d-flex justify-content-between">
                <span>
                  You have <strong>{card.card.length} items</strong> in your
                  cart
                </span>
                <strong>Total Price : {totalPrice} €</strong>
              </div>

              {card.card.map((item) => (
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                  <div className="d-flex flex-row">
                    <a href="/wines/info/{{this.wine._id}}">
                      <img
                        className="cardImage"
                        src={item.wine.ImageUrl}
                        width="40"
                      />
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="ml-2">
                      <span className="font-weight-bold d-block">
                        {item.wine.WineName}
                      </span>
                      <span className="spec">
                        {item.wine.Type} , {item.wine.Color}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="d-block">
                      {formatDate(new Date(item.card.CardDate))}{" "}
                      &nbsp;&nbsp;&nbsp;
                    </span>{" "}
                    &nbsp; <span className="d-block">{item.card.Amount}</span>
                    <strong>&nbsp; x &nbsp;</strong>
                    <span className="d-block ml-5 font-weight-bold">
                      {item.wine.Price}&nbsp; = &nbsp;
                    </span>
                    <span className="d-block ml-5 font-weight-bold">
                      <strong>
                        {item.wine.Price * item.card.Amount}&nbsp;€
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <FontAwesomeIcon
                        className="deleteIcon"
                        icon={faTrash}
                        size="1x"
                      />
                    </span>
                    <form action="/auth/deleteFromCard" method="POST">
                      <input
                        name="wineId"
                        //   value="{{this.wine._id}}"
                        required
                        hidden
                      />

                      <button type="submit" className="delete">
                        {" "}
                        <i className="fa fa-trash-o ml-3 text-black-50"></i>
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-2">
          <br />
          <br />
          Continue with Order
          <br />
          <div className="payment-info">
            Personal Details
            <div className="row">
              <div className="col-md-6">
                <label className="credit-card-label">Shipping location</label>
                {/* <input
                      type="text"
                      className="form-control credit-inputs"
                      placeholder="Atiki,Greece"
                    /> */}
              </div>
              <div className="col-md-6">
                <label className="credit-card-label">Zip Number</label>
                {/* <input
                      type="text"
                      className="form-control credit-inputs"
                      placeholder="Zip number"
                    /> */}
              </div>
              <br />
              <div className="col-md-6">
                <label className="credit-card-label">Address with Number</label>
                {/* <input
                      type="text"
                      className="form-control credit-inputs"
                      placeholder="Zip number"
                    /> */}
              </div>
            </div>
            <hr className="line" />
            Card Details
            <div>
              <label className="credit-card-label">Name on card</label>
              {/* <input
                    type="text"
                    className="form-control credit-inputs"
                    placeholder="Name"
                  /> */}
            </div>
            <div>
              <label className="credit-card-label">Card number</label>
              {/* <input
                    type="text"
                    className="form-control credit-inputs"
                    placeholder="0000 0000 0000 0000"
                  /> */}
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="credit-card-label">Date</label>
                {/* <input
                      type="text"
                      className="form-control credit-inputs"
                      placeholder="12/24"
                    /> */}
              </div>
              <div className="col-md-6">
                <label className="credit-card-label">CVV</label>
                {/* <input
                      type="text"
                      className="form-control credit-inputs"
                      placeholder="342"
                    /> */}
              </div>
            </div>
            <hr className="line" />
            Sumary
            <div className="d-flex justify-content-between information">
              <span>Subtotal</span>
              <span>$</span>
            </div>
            <div className="d-flex justify-content-between information">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="d-flex justify-content-between information">
              <span>Total(Incl. taxes)</span>
              <span></span>
            </div>
            <form action="/auth/addtoHistory" method="POST">
              {/* <input
                    type="number"
                    name="totalPrice"
                    value="{{total_price}}"
                  /> */}
              <button
                className="btn btn-primary btn-block d-flex justify-content-between mt-3"
                type="submit"
              >
                <span>$</span>
                <span>
                  Checkout<i className="fa fa-long-arrow-right ml-1"></i>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
