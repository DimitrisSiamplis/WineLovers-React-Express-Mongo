const express = require("express");
const cookieParser = require("cookie-parser");
var session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const User = require("../model/user");
const Wine = require("../model/wine");
const Comment = require("../model/comment");
const Card = require("../model/card");
const History = require("../model/history");
const BlogQuestion = require("../model/blogQuestion");
const AplyQuestion = require("../model/aplyQuestion");
const { aggregate } = require("../model/user");

mongoose.connect(
  "mongodb+srv://dimitris:Cd2iV6XWeteaoE8r@cluster0.yfueb.mongodb.net/dimitris?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const router = express.Router();

router.get("/", (req, res) => {
  var sess;
  sess = req.session;
  if (sess.email) {
    res.redirect("/home");
  } else {
    res.render("index");
  }
});

router.get("/home", async (req, res) => {
  var sess;
  sess = req.session;

  if (sess.email) {
    let user = await User.findOne({ Email: sess.email });

    res.render("home", { id: user._id });
  } else {
    res.redirect("/index");
  }
});

router.get("/logout", (req, res) => {
  var sess;
  sess = req.session;
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    return res.redirect("/");
  });
});

router.get("/profile/:id", async (req, res) => {
  var sess;
  sess = req.session;
  var id = req.params.id;

  if (sess.email) {
    let user = await User.findOne({ Email: sess.email });
    console.log(user);

    var isMale = true;
    if (user.Gender === "Female") {
      isMale = false;
    }

    let userDetails = {
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      Birthday: user.Birthday,
      Gender: user.Gender,
      Mobile: user.Mobile,
      Address: user.Address,
      isMale: isMale,
    };

    res.render("profile", { message: "Profile Details", results: userDetails });
  } else {
    res.redirect("/index");
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({
    Email: req.body.email,
    Password: req.body.password,
  });

  if (user) {
    res.send({
      status: true,
      email: user.Email,
    });
  } else {
    res.send({
      status: false,
    });
  }
});

router.post("/register", async (req, res) => {
  let user = await User.findOne({
    Email: req.body.useDetails.email,
  });
  console.log(user);
  if (user) {
    res.send({
      alreadyExist: true,
    });
  } else {
    newUser = new User({
      FirstName: req.body.useDetails.firstName,
      LastName: req.body.useDetails.lastName,
      Email: req.body.useDetails.email,
      Password: req.body.useDetails.password,
      Birthday: req.body.useDetails.birthday,
      Gender: req.body.useDetails.sex,
      Mobile: req.body.useDetails.phone,
      Address: req.body.useDetails.address,
      Number: req.body.useDetails.number,
      Age: req.body.useDetails.age,
    });
    // await newUser.save();
    res.send({
      alreadyExist: false,
    });
  }
});

router.get("/getWines", async (req, res) => {
  let wine = await Wine.find();
  res.send(wine);
});

router.get("/getUser/:email", async (req, res) => {
  var email = req.params.email;
  console.log(email);
  let user = await User.findOne({ Email: email });
  res.send({
    user: user,
  });
});

router.get("/getWine/:wineId", async (req, res) => {
  var wineId = req.params.wineId;
  let wine = await Wine.findOne({ _id: wineId });
  res.send({
    wine: wine,
  });
});

router.post("/getCard", async (req, res) => {
  let user = await User.findOne({ Email: req.body.email });
  let card = await Card.find({ IsCompleted: false, UserId: user._id });
  let cardsid = [];
  let cards = [];
  for (const item in card) {
    cardsid.push(card[item].WineId);
  }

  let wine = await Wine.find({ _id: cardsid });

  for (const item in card) {
    cards.push({
      wine: wine[item],
      card: card[item],
    });
  }
  res.send({
    card: cards,
  });
});

router.post("/completeOrder", async (req, res) => {
  let user = await User.findOne({ Email: req.body.email });

  history = new History({
    WinesList: req.body.wineList,
    UserId: user._id,
    Date: new Date(),
    Price: req.body.totalPrice,
  });
  console.log(history);
  await history.save();
  res.send({
    status: true,
  });
});

router.post("/getHistory", async (req, res) => {
  let user = await User.findOne({ Email: req.body.email });

  let history = await History.find({ UserId: user._id });

  let WinesArray = [];
  for (const key in history) {

    for (const key1 in history[key].WinesList) {
      WinesArray.push(history[key].WinesList[key1]);
    }
  }
  let wines = await Wine.find({ _id: WinesArray });

  res.send({
    history: history,
    wines: wines,
  });
});

// router.get("*", (req, res) => {
//   return res.redirect("/");
// });

module.exports = router;
