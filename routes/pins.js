"use strict";

const express = require('express');
const router = express.Router();
const cookieParser  = require('cookie-parser');
const app = express();

app.use(cookieParser());

module.exports = (knex) => {

  router.get("/api", (req, res) => {
    knex
      .select("*")
      .from("pins")
      .then((results) => {
        res.json(results);
    })
    .catch(e => console.error(e))
  });

  return router;
}
