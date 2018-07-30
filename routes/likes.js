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
        res.json(results);
      });
  });

  router.post("/:id", (req, res) => {
    const user_id = req.cookies.user_id;
    const map_id = req.params.id;
    knex("likes").insert({
        user_id: user_id,
        map_id: map_id
      })
      .then(() => {
        res.redirect("/users");
      })
      .catch(e => console.error(e))
  })

  return router;
}
