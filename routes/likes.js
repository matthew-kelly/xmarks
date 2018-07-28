"use strict";

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

module.exports = (knex) => {

  // Display all likes from database in JSON format
  router.get("/api", (req, res) => {
    knex
      .select("*")
      .from("likes")
      .then((results) => {
        // console.log(results);
        res.json(results);
      });
  });

  return router;
}
