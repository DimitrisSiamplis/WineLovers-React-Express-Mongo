import React from "react";
import "./History.css";
import "./Card.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Alert,
  Table,
} from "react-bootstrap";

const History = () => {
  const [history, setHistory] = useState([]);
  const [wines, setWines] = useState([]);

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  const getHistory = () => {
    let userDetails = {
      email: userEmail,
    };
    fetch("http://localhost:4000/getHistory", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        var historyArray = [];
        for (const key in json.history) {
          //   console.log(json.history[key].WinesList);
          var winesArray = [];
          for (const key1 in json.wines) {
            // console.log(json.wines[key1]._id);

            if (json.history[key].WinesList.includes(json.wines[key1]._id)) {
              winesArray.push(json.wines[key1]);
            }
          }
          historyArray.push({
            history: json.history[key],
            wines: winesArray,
          });
        }
        console.log(historyArray);
        setHistory(historyArray);
      });
  };
  useEffect(() => {
    getHistory();
  }, []);

  const dateFormater = (date) => {
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      "-" +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    return dateStr;
  };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    <div>
        <h3 className="HistoryOrderTable">History Order Table</h3>
      <Table striped bordered hover className="tableHistory">
        <thead>
          <tr>
            <th>Wine Names</th>
            <th>Bootle Price</th>
            <th>Amount</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Shipping Date</th>
            <th>Address</th>
            <th>Payment Kind</th>
            <th>Extra Details</th>
          </tr>
        </thead>
        {history.length !== 0 && (
          <tbody>
            {history.map((item) => (
              <tr>
                <td>
                  {item.wines.map((wine) => (
                    <strong>
                      <a href={`/wine/${wine._id}`}>{wine.WineName}</a>
                      <br />
                    </strong>
                  ))}
                </td>
                <td>
                  {item.wines.map((wine) => (
                    <strong>
                      {wine.Price} €
                      <br />
                    </strong>
                  ))}
                </td>
                <td>Otto</td>
                <td>
                  <strong>{item.history.Price} €</strong>
                </td>
                <td>
                  <strong>{dateFormater(new Date(item.history.Date))}</strong>
                </td>
                <td>{dateFormater(new Date( new Date(item.history.Date).setDate(new Date(item.history.Date).getDate() +3)))}</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default History;
