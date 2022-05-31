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
    });
  } else {
    res.send({
      status: false,
    });
  }
});

// router.get("*", (req, res) => {
//   return res.redirect("/");
// });

module.exports = router;
