"use strict";

const express = require('express');
const router = express.Router();
const cookieParser  = require('cookie-parser');
const app = express();

app.use(cookieParser());

module.exports = (knex) => {
  // json data from database
  router.get("/api", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        // console.log(results);
        res.json(results);
      })
      // .catch(e)
  });

  // map 1 !!!!CHANGE TO :id!!!!
  router.get("/1", (req, res) => {
    res.status(200).render("show");
  })

  return router;
}
