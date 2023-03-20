//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://0.0.0.0:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

const usersSchema = new mongoose.Schema({
  email: String,
  password: String,
});

secret = "Thisismylittlesecret."

usersSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password" ]});

const User = mongoose.model("User", usersSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  User.findOne({
    email: req.body.username,
  })
    .then((foundUser) => {
      if (foundUser.password === req.body.password) {
        res.render("secrets");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000.");
});
