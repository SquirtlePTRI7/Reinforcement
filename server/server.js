require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const MongoURI = process.env.MongoURI;
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const session = require('express-session');

mongoose.connect(MongoURI);
const db = mongoose.connection;
db.on("error", () => console.log("Error connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

const DIST_DIR = path.join(__dirname, "../build/");
const HTML_FILE = path.join(DIST_DIR, "index.html");

// Serve static files
app.use(express.static(DIST_DIR));
app.use(express.static("../src/assets"));

// Serve index.html
app.get("/*", (req, res) => {
  res.status(200).sendFile(HTML_FILE);
});

//Oauth
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  cb(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', isAuth, (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/login.html');
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

//auth
app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});