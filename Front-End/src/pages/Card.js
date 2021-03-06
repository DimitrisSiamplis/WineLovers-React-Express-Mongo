import React from "react";
import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";

const Card = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [kindPayment, setKindPayment] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userDetails, setUseretails] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const cookies = new Cookies();
  var userEmail = cookies.get("email");
  console.log(cookies.get("card"));

  // ------------ Get user Details -----------------
  const getUser = () => {
    fetch(`http://localhost:4000/getUser/${userEmail}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.user);
        setAddress(json.user.Address);
        setPhoneNum(json.user.Mobile);
        setUseretails([json]);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  var cardDetails =
    cookies.get("card") === "" || cookies.get("card") === undefined
      ? []
      : cookies.get("card").split("|");

  const [card, setCard] = useState(cardDetails);

  // -------- Delete from Card ----------
  const onDeletefromCard = (item) => {
    var cardCookies = cookies.get("card");
    var cardArray = cardCookies.split("|");
    cardArray = cardArray.filter((word) => word !== item);

    if (cardArray === [""]) {
      cookies.remove("card");
      // cookies.set("card", undefined , { path: "/" });
      setCard([]);
    } else {
      cookies.set("card", cardArray.join("|"), { path: "/" });
      setCard(cardArray);
    }
  };

  useEffect(() => {
    if (card.length === 0) {
      setTotalPrice(0);
    } else {
      var total_price = 0;
      for (const key in card) {
        total_price =
          Number(total_price) +
          Number(card[key].split(",")[5] * card[key].split(",")[7]);
      }
      setTotalPrice(total_price);
    }
  }, [card]);

  const onCreateOrder = () => {
    var wineList = [];
    for (const key in card) {
      wineList.push(card[key].split(",")[0]);
    }
    // console.log(totalPrice);
    // console.log(userEmail);
    // console.log(wineList)

    let cardDetails = {
      wineList: wineList,
      email: userEmail,
      totalPrice: totalPrice,
    };
    fetch("http://localhost:4000/completeOrder", {
      method: "POST",
      body: JSON.stringify(cardDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        cookies.remove("card");

        setCard([]);
      });
  };

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

          {card.length === 0 && (
            <Alert className="emptyAlert" variant="warning">
              The Card is Empty!
            </Alert>
          )}
          {card.length !== 0 && (
            <div>
              <div className="d-flex justify-content-between">
                <span>
                  You have <strong>{card.length} items</strong> in your cart
                </span>
                <strong>Total Price : {totalPrice} ???</strong>
              </div>

              {card.map((item) => (
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                  <div className="d-flex flex-row">
                    <a href={`/wine/${item.split(",")[0]}`}>
                      <img
                        className="cardImage"
                        src={item.split(",")[6]}
                        width="40"
                      />
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="ml-2">
                      <span className="font-weight-bold d-block">
                        {item.split(",")[1]}
                      </span>
                      <span className="spec">
                        {item.split(",")[4]} , {item.split(",")[3]}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="d-block">
                      {/* {formatDate(new Date(item.card.CardDate))}{" "} */}
                      &nbsp;&nbsp;&nbsp;
                    </span>{" "}
                    &nbsp; <span className="d-block">{item.split(",")[7]}</span>
                    <strong>&nbsp; x &nbsp;</strong>
                    <span className="d-block ml-5 font-weight-bold">
                      {item.split(",")[5]}
                      &nbsp; = &nbsp;
                    </span>
                    <span className="d-block ml-5 font-weight-bold">
                      <strong>
                        {item.split(",")[7] * item.split(",")[5]} &nbsp;???
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <FontAwesomeIcon
                        className="deleteIcon"
                        onClick={() => {
                          onDeletefromCard(item);
                        }}
                        icon={faTrash}
                        size="1x"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {userDetails.length !== 0 && (
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
                  <input
                    type="text"
                    value={address}
                    className="form-control credit-inputs"
                    placeholder="Atiki,Greece 31"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="credit-card-label">Zip Number</label>
                  <input
                    type="text"
                    className="form-control credit-inputs"
                    placeholder="15231"
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                </div>
                {zipCode !== "" && zipCode.length !== 5 && (
                  <p className="alertMessage">Wrong Zip Code. Max length 5.</p>
                )}
                <br />
                <div className="col-md-6">
                  <label className="credit-card-label">Phone Number</label>
                  <input
                    type="text"
                    value={phoneNum}
                    className="form-control credit-inputs"
                    placeholder="6999999999"
                    onChange={(e) => {
                      setPhoneNum(e.target.value);
                    }}
                  />
                </div>

                {phoneNum !== "" &&
                  (isNaN(phoneNum) ||
                    phoneNum.length > 10 ||
                    phoneNum.length < 10) && (
                    <p className="alertMessage">Wrong Phone Number</p>
                  )}
              </div>
              <hr className="line" />
              Kind of Payment
              <div>
                <label className="credit-card-label">Name on card</label>
                <select
                  className="form-control credit-inputs"
                  onChange={(e) => {
                    setKindPayment(e.target.value);
                  }}
                >
                  <option value="delivery">Pay on delivery</option>
                  <option value="deposit">Bank deposit</option>
                  <option value="card">Payment by card</option>
                </select>
              </div>
              {kindPayment === "card" && (
                <div>
                  <hr className="line" />
                  Card Details
                  <div>
                    <label className="credit-card-label">Card number</label>
                    <input
                      type="text"
                      className="form-control credit-inputs"
                      // maxLength="19"
                      value={cardNumber}
                      onChange={(e) => {
                        console.log(e.target.value.length);
                        if (
                          (!isNaN(e.target.value[e.target.value.length - 1]) ||
                            e.target.value === "") &&
                          e.target.value.length < 16
                        ) {
                          setCardNumber(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="credit-card-label">Date</label>
                      <input
                        type="search"
                        value={
                          cardDate.length == 2
                            ? cardDate.slice(0, 2) + "/"
                            : cardDate
                        }
                        className="form-control credit-inputs"
                        placeholder="12/24"
                        onChange={(e) => {
                          if (e.target.value.length < 6) {
                            var testArray = e.target.value.split("/");
                            var newEtargetValue = "";
                            for (const key in testArray) {
                              newEtargetValue =
                                newEtargetValue + testArray[key];
                            }
                            console.log(newEtargetValue);
                            if (!isNaN(newEtargetValue)) {
                              setCardDate(e.target.value);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="credit-card-label">CVV</label>
                      <input
                        type="search"
                        className="form-control credit-inputs"
                        placeholder="342"
                        value={cardCVV}
                        onChange={(e) => {
                          if (
                            !isNaN(e.target.value) &&
                            e.target.value.length < 4
                          ) {
                            setCardCVV(e.target.value);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr className="line" />
              Sumary
              <div className="d-flex justify-content-between information">
                <span>Subtotal</span>
                <span> {totalPrice} ???</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Shipping</span>
                <span>
                  {totalPrice > 50 || totalPrice === 0 ? "0 ???" : "3 ???"}
                </span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Total(Incl. taxes)</span>
                <span>
                  {totalPrice > 50 || totalPrice === 0
                    ? totalPrice
                    : totalPrice + 3}{" "}
                  ???
                </span>
              </div>
              {/* <input
                    type="number"
                    name="totalPrice"
                    value="{{total_price}}"
                  /> */}
              <button
                disabled={card.length === 0}
                onClick={onCreateOrder}
                className="btn btn-primary btn-block d-flex justify-content-between mt-3"
              >
               
                <span>
                  Complete Order<i className="fa fa-long-arrow-right ml-1"></i>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
