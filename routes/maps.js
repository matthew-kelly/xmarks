"use strict";

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

module.exports = (knex) => {

  router.get("/api", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
      })
    // .catch(e)
  });

  router.post("/", (req, res) => {
    console.log("req.body", req.body);
    console.log("req.cookies", req.cookies);
    knex("maps").insert({
      name: req.body.map_name,
      latitude_center: "49.2827",
      longitude_center: "-123.1207",
      user_id: req.cookies["user_id"]
    }).then(() => {
      res.redirect("/users");
    })
  })

  return router;
}
