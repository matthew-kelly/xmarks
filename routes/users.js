"use strict";

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

module.exports = (knex) => {

  // Display all users from database in JSON format
  router.get("/api", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((users) => {
        return res.json(users);
      })
      .catch(e => console.error(e))
  });

  // Redirect from /users to /users/:id
  router.get("/", (req, res) => {
    let user_id = req.cookies.user_id;
    res.redirect(`/users/${user_id}`);
  })

  // Render /users/:id, pass in user info and their maps
  router.get("/:id", (req, res) => {
    const userProfile = req.params.id;
    let templateVars = {};
    templateVars.current_tab = req.cookies["current_tab"];
    const madeMapsPromise = knex.select("*")
      .from("users")
      .innerJoin("maps", "maps.user_id", "users.id")
      .where({
        "maps.user_id": userProfile
      })
      .then((rows) => {
        let userObj = {};
        userObj.user_id = rows[0].user_id;
        userObj.username = rows[0].username;
        userObj.bio = rows[0].bio;
        userObj.email = rows[0].email;
        userObj.password = rows[0].password;
        userObj.color = rows[0].color;
        templateVars.userObj = userObj;
        let mapsObj = {}
        for (let i = 0; i < rows.length; i++) {
          let newMap = {};
          newMap.id = rows[i].id;
          newMap.name = rows[i].name;
          mapsObj[newMap.id] = newMap;
        }
        templateVars.mapsObj = mapsObj;
      })
      .catch(e => console.error(e))

    const likedMapsPromise = knex.select("*")
      .from("likes")
      .innerJoin("maps", "maps.id", "map_id")
      .where({
        "likes.user_id": userProfile
      })
      .then((rows) => {
        let likesObj = {};
        for (let i = 0; i < rows.length; i++) {
          let newLike = {};
          newLike.id = rows[i].id;
          newLike.name = rows[i].name;
          likesObj[newLike.id] = newLike;
        }
        templateVars.likesObj = likesObj;
      })
      .catch(e => console.error(e))

    const contribMapsPromise = knex.distinct("map_id")
      .select("*")
      .from("pins")
      .innerJoin("maps", "maps.id", "map_id")
      .where({
        "pins.user_id": userProfile,
      })
      .then((rows) => {
        let contribObj = {};
        for (let i = 0; i < rows.length; i++) {
          let newContrib = {};
          newContrib.id = rows[i].map_id;
          newContrib.name = rows[i].name;
          contribObj[newContrib.id] = newContrib;
        }
        templateVars.contribObj = contribObj;
      })
      .catch(e => console.error(e))

      Promise.all([madeMapsPromise, likedMapsPromise, contribMapsPromise])
      .then(() => {
        // console.log("TEMPLATE VARS: ", templateVars);
        res.status(200).render("profile", templateVars);
      })
      .catch(e => console.error(e))
  })

  router.get("/:id/made", (req, res) => {
    res.cookie("current_tab", "made");
    const user_id = req.params.id;
    res.redirect(`/users/${user_id}`);
  })

  router.get("/:id/likes", (req, res) => {
    res.cookie("current_tab", "likes");
    const user_id = req.params.id;
    res.redirect(`/users/${user_id}`);
  })

  router.get("/:id/contrib", (req, res) => {
    res.cookie("current_tab", "contrib");
    const user_id = req.params.id;
    res.redirect(`/users/${user_id}`);
  })


  return router;
}
