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
      .from("pins")
      .then((results) => {
        // console.log(results);
        res.json(results);
      });
  });

  // router.get("/api", (req, res) => {
  //   knex
  //     .join("maps", "pins.map_id", "maps.id")
  //     .join("users", "pins.user_id", "users.id")
  //     .select("pins.id", "pins.user_id", "pins.title", "pins.description", "pins.latitude", "pins.longitude", "maps.id as map_id", "maps.name as map_name", "maps.user_id as map_creator", "maps.latitude_center as map_lat", "maps.longitude_center as map_long")
  //     .from("pins")
  //     .then((results) => {
  //       // console.log(results);
  //       res.json(results);
  //     })
  //   // .catch(e)
  // });

  return router;
}
