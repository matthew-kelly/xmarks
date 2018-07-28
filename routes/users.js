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

    knex.select("*")
      .from("users")
      .innerJoin("maps", "maps.user_id", "users.id")
      .where({
        "maps.user_id": userProfile
      })
      .then((rows) => {
        let userObj = {};
        userObj.user_id = rows[0].user_id;
        userObj.username = rows[0].username;
        userObj.description = rows[0].description;
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
        res.status(200).render("profile", templateVars);
      })
      .catch(e => console.error(e))
  })

  return router;
}
