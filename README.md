
# Lighthouse Labs Midterm Project - XMarks

XMarks is a full stack social map-sharing application built using the Google Maps API on a Node, Express, and PostgreSQL back-end. Users can places custom pins and descriptions on a map, save them, and share them with friends. As part of a two-person team with @comberj, I built the back-end of the app and contributed to the front-end structure and integration.


## Screenshots

!["This is the main profile page - default view on most laptops/desktops](https://github.com/matthew-kelly/xmarks/blob/master/docs/profile-page.png)
!["This is the map tool with a few pins added"](https://github.com/matthew-kelly/xmarks/blob/master/docs/maps.png)
!["This is a list of all current maps"](https://github.com/matthew-kelly/xmarks/blob/master/docs/list.png)


## Getting Started

- Install all dependencies:

  `npm install`

- Set up database schema and populate initial seed data:

  `knex migrate:latest && knex seed:run`

- Run the development web server:

  `npm start`


## Dependencies

    body-parser: ^1.15.2,
    cookie-parser: ^1.4.3,
    dotenv: ^2.0.0,
    ejs: ^2.4.1,
    express: ^4.13.4,
    knex: ^0.11.7,
    knex-logger: ^0.1.0,
    morgan: ^1.7.0,
    node-sass-middleware: ^0.9.8,
    pg: ^6.0.2
