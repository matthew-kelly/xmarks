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
      .from("users")
      .then((users) => {
        return res.json(users);
      })
      .catch(e => console.error(e))
  });

  router.get("/", (req, res) => {
    let user_id = req.cookies.user_id;
    res.redirect(`/users/${user_id}`);
  })

  router.get("/:id", (req, res) => {
    const userProfile = req.params.id;
    knex.select('*')
      .from("users")
      .where({
        "id": userProfile
      }).then((rows) => {
        var userObj = {};
        userObj.id = rows[0].id;
        userObj.username = rows[0].username;
        userObj.description = rows[0].description;
        userObj.email = rows[0].email;
        userObj.password = rows[0].password;
        userObj.color = rows[0].color;
        res.status(200).render("profile", userObj);
      })
      .catch(e => console.error(e))
  })

  return router;
}
