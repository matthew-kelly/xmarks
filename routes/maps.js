"use strict";

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

module.exports = (knex) => {

  // Display all maps from database in JSON format
  router.get("/api", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
      })
      .catch(e => console.error(e))
  });

  // Return all pins associated with the map:id
  router.get("/:id", (req, res) => {
    const map_id = req.params.id;
    knex
      .select("*")
      .from("pins")
      .leftJoin("maps", "map_id", "maps.id")
      .where({
        map_id: map_id
      })
      .then((results) => {
        res.json(results);
      })
      .catch(e => console.error(e))
  })

  router.get("/", (req, res) => {
    let templateVars = {};
    knex.select("*")
      .from("maps")
      .then((rows) => {
        let MapsObj = {};
        for (let i = 0; i < rows.length; i++) {
          let newMap = {};
          newMap.id = rows[i].id;
          newMap.name = rows[i].name;
          MapsObj[newMap.id] = newMap;
        }
        templateVars.MapsObj = MapsObj;
        res.status(200).render("allmaps", templateVars);
      })
      .catch(e => console.error(e))
  })

  // Add new map and pins to database
  router.post("/", (req, res) => {
    const pinsArray = JSON.parse(req.body.pins_array);
    console.log(pinsArray)
    knex("maps").insert({
        name: req.body.map_name,
        latitude_center: "49.2827",
        longitude_center: "-123.1207",
        user_id: req.cookies.user_id
      }).returning('id')
      .then(newId => {
        const mapID = parseInt(newId[0]);
        pinsArray.forEach((pin) => {
          knex("pins").insert({
            title: pin.title,
            description: pin.description,
            latitude: pin.latitude,
            longitude: pin.longitude,
            delete_id: pin.delete_id,
            user_id: req.cookies.user_id,
            map_id: mapID
          }).then();
        })
        res.redirect("/users");
      })
      .catch(e => console.error(e))
  })

  // router.post("/update", (req, res) => {
  //   const pinsArray = JSON.parse(req.body.input_pins);
  //   const map_id = pinsArray[0].map_id;
  //   pinsArray.forEach((pin) => {
  //     pin.map_id = map_id; // ties pin to current map
  //     knex("pins")
  //     .where({
  //       map_id: pin.map_id,
  //       title: pin.title,
  //       description: pin.description
  //     })
  //     .update({
  //       latitude: pin.latitude,
  //       longitude: pin.longitude
  //     })
  //     .catch(e => console.error(e))
  //   })
  //   res.redirect("/users");
  // })

  return router;
}
