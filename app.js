//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

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
    password: String
})

const User = mongoose.model("User", usersSchema)

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000.");
});
