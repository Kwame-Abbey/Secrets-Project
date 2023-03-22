//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

main().catch(err => console.log(err));
 
async function main() {
    await mongoose.connect("mongodb://0.0.0.0:27017/userDB");
}
 

const usersSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", usersSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secret"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ googleId: profile.id }).then((foundUser) => {
    if(foundUser){
      return foundUser
    } else {
      const newUser = new User({
        googleId: profile.id
      })

      return newUser.save()
    }
  }).then((user) => {
    return cb(null, user)
  }).catch((err) => {
    return cb(err)
  })
}
));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secret', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("Secrets")
  } else {
    res.redirect("/login")
  }
})

app.get("/logout", (req, res) => {
  req.logout(function(err){
    if(err) {
      console.log(err)
    }
     
    res.redirect("/")
    
  })
  
})

app.post("/register", (req, res) => {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err)
      res.redirect("/register")
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets")
      })
    }
  })

});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, function(err) {
    if (err) {
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets")
      })
    }
  })

});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000.");
});
