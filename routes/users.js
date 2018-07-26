"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log("this");
    knex
      .select("*")
      .from("users")
      .then((results) => {
        console.log(results);
        res.json(results);
    });
  });

  return router;
}
