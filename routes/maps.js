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
    console.log("map name from maps.js: ", req.body.map_name);
    knex("maps").insert({
      name: req.body.map_name,
      latitude_center: "49.2827",
      longitude_center: "-123.1207",
      user_id: req.cookies["user_id"]
    }).returning('id')
    .then(newId => {
      const mapID = parseInt(newId[0]);
      const pinsArray = req.body.pins;
      console.log("pinsArray: ", pinsArray);
      // pinsArray.forEach(function (pin) {
      //   knex("pins").insert({
      //     title: pin.title,
      //     latitude: pin.latitude,
      //     longitude: pin.longitude,
      //     user_id: req.cookies["user_id"],
      //     map_id: mapID
      //   })
      // })
    }).then(() => {
      res.redirect("/users");
    })
  })

  return router;
}
