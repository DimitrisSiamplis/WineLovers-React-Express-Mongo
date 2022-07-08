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
  let comment = await Comment.find().sort({
    CommentDate: -1,
  });

  var wines = [];
  for (const key in wine) {
    var total_rating = 0;
    var number_of_rate = 0;
    for (const key1 in comment) {
      if (wine[key]._id == comment[key1].WineId) {
        total_rating = total_rating + Number(comment[key1].Rating);
        number_of_rate = number_of_rate + 1;
      }
    }

    var sum_total_rate = 0;
    if (number_of_rate != 0) {
      sum_total_rate = total_rating / number_of_rate;
    }

    wines.push({
      wine: wine[key],
      sum_total_rate: sum_total_rate,
      number_of_rate: number_of_rate,
    });
  }

  res.send({ wines: wines });
});

router.get("/getBlogs", async (req, res) => {
  let blogQuestion = await BlogQuestion.find();

  let numberOfApplies = [];
  for (const key in blogQuestion) {
    var aplyQuestion = await AplyQuestion.find({
      QuestionId: blogQuestion[key]._id,
    });

    numberOfApplies.push({
      numberOfApplies: aplyQuestion.length,
      blogs: blogQuestion[key],
    });
  }

  res.send({ numberOfApplies });
});

router.get("/getUser/:email", async (req, res) => {
  var email = req.params.email;
  let user = await User.findOne({ Email: email });
  res.send({
    user: user,
  });
});

router.get("/getUserComments/:email", async (req, res) => {
  var email = req.params.email;
  let user = await User.findOne({ Email: email });
  let comments = await Comment.find();
  let userComment = await Comment.find({ UserId: user._id });

  var ratesPerRate = [0, 0, 0, 0, 0];
  for (const key in userComment) {
    if (userComment[key].Rating === 1) {
      ratesPerRate[0] = ratesPerRate[0] + 1;
    }
    if (userComment[key].Rating === 2) {
      ratesPerRate[1] = ratesPerRate[1] + 1;
    }
    if (userComment[key].Rating === 3) {
      ratesPerRate[2] = ratesPerRate[2] + 1;
    }
    if (userComment[key].Rating === 4) {
      ratesPerRate[3] = ratesPerRate[3] + 1;
    }
    if (userComment[key].Rating === 5) {
      ratesPerRate[4] = ratesPerRate[4] + 1;
    }
  }
  console.log(ratesPerRate);

  res.send({
    numberOfComments: comments.length,
    numberOfUserComment: userComment.length,
    ratesPerRate: ratesPerRate,
  });
});

router.get("/getWine/:wineId", async (req, res) => {
  var wineId = req.params.wineId;
  let wine = await Wine.findOne({ _id: wineId });
  let comment = await Comment.find({ WineId: wineId }).sort({
    CommentDate: -1,
  });

  var userIds = [];
  var total_rating = 0;
  for (const key in comment) {
    userIds.push(comment[key].UserId);
    total_rating = total_rating + comment[key].Rating;
  }

  total_rating = total_rating / comment.length;

  let users = await User.find({ _id: userIds });

  var Comments = [];
  for (const key in comment) {
    for (const key1 in users) {
      if (comment[key].UserId == users[key1]._id) {
        Comments.push({
          comment: comment[key],
          user: users[key1],
        });
      }
    }
  }

  res.send({
    wine: wine,
    Comments: Comments,
    total_rating: total_rating,
  });
});

router.get("/getApliesToQuestion/:questionId", async (req, res) => {
  var questionId = req.params.questionId;
  console.log(questionId);

  let aplyQuestion = await AplyQuestion.find({ QuestionId: questionId });
  let blogQuestions = await BlogQuestion.find({ _id: questionId });
  res.send({
    aplyQuestion,
    blogQuestions,
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

router.post("/createQuestion", async (req, res) => {
  blogQuestion = new BlogQuestion({
    Question: req.body.question.trim(),
    QuestionDate: new Date(),
    UserId: req.body.id,
    UserName: req.body.Name,
    UserEmail: req.body.email,
  });
  await blogQuestion.save();
  res.send({
    status: true,
  });
});

router.post("/applyToQuestion", async (req, res) => {
  aplyQuestion = new AplyQuestion({
    QuestionId: req.body.blogQuestionId,
    Aply: req.body.apply,
    AplyDate: new Date(),
    AplierId: req.body.userId,
    AplierName: req.body.userName,
    AplierEmail: req.body.userEmail,
  });
  await aplyQuestion.save();
  console.log(aplyQuestion);

  res.send({
    status: true,
  });
});

router.post("/changePassword", async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ Email: req.body.userEmail });
  console.log(user);
  if (user) {
    await User.updateOne(
      { Email: req.body.userEmail },
      { $set: { Password: req.body.newConfirmPassword } }
    );
    res.send({
      status: true,
    });
  } else {
    res.send({
      status: false,
    });
  }
});

router.post("/editProfile", async (req, res) => {
  console.log(req.body.name, req.body.mobile, req.body.address);

  await User.updateOne(
    { Email: req.body.email },
    {
      $set: {
        Name: req.body.name,
        Mobile: req.body.mobile,
        Address: req.body.address,
      },
    }
  );

  res.send({
    status: true,
  });
});

router.post("/newWineComment", async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ Email: req.body.userEmail });

  comment = new Comment({
    WineId: req.body.id,
    UserId: user._id,
    Comment: req.body.newComment,
    Rating: req.body.newRate,
    CommentDate: new Date(),
  });

  await comment.save();
  res.send({
    status: true,
  });
});

router.post("/addWine", async (req, res) => {
  console.log(req.body);
  wine = new Wine({
    WineName: req.body.wineName,
    Type: req.body.Type,
    Color: req.body.color,
    Winery: req.body.winery,
    Country: req.body.country,
    Location: req.body.location,
    Price: req.body.price,
    Year: req.body.year,
    ImageUrl: req.body.imageURL,
    WineDescription: req.body.discription,
    Grapes: req.body.grape,
  });

  await wine.save();
  res.send({
    status: true,
  });
});

// router.get("*", (req, res) => {
//   return res.redirect("/");
// });

module.exports = router;
