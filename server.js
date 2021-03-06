"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const likesRoutes = require("./routes/likes");
const pinsRoutes = require("./routes/pins");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.static(__dirname + '/views')); // allows css in expressjs
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/maps", mapsRoutes(knex));
app.use("/likes", likesRoutes(knex));
app.use("/pins", pinsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Assign login cookie, redirect to user's page
app.get("/profile", (req, res) => {
  res.cookie("user_id", "1");
  res.cookie("current_tab", "made");
  const user_id = req.cookies["user_id"];
  res.redirect(`/users/${user_id}`);
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
