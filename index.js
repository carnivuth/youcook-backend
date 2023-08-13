//express initialization
const express = require("express");
const app = express();

//dotenv config
require("dotenv").config();

//cors config
var cors = require("cors");
app.use(cors());

//bodyparser configuration
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// url setup
app.use(express.urlencoded({ extended: true }));

//db setup
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.connect();

//app.use(express.json());

///////////////MAIN LOGIC

///////////////////HOME
app.get("/", (req, res) => {
  res.send(JSON.stringify(process.env.APP_NAME));
});

///////////////////////RECIPES ROUTE

//get recipes
app.get("/recipes", (req, res) => {
  var query = "select * from RECIPES";

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});

//get recipe
app.get("/recipes/:id", (req, res) => {
  var query = "select * from RECIPES where RECIPES.id=" + req.params.id;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      var result = JSON.stringify(rows[0]);
      console.log(result);
      res.send(result);
    }
  });
});

//get recipe ingredients
app.get("/recipes/:id/ingredients", (req, res) => {
  var recipe_id = req.params.id;
  var query =
    "select * from INGREDIENTS " +
    "left join QUANTITIES  on QUANTITIES.id_ingredient = INGREDIENTS.id " +
    "where QUANTITIES.id_recipe=" +
    recipe_id;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});

//get recipe steps
app.get("/recipes/:id/steps", (req, res) => {
  var recipe_id = req.params.id;
  var query =
    "select * from STEPS " +
    "left join RECIPE_STEPS  on RECIPE_STEPS.id_step = STEPS.id " +
    "where RECIPE_STEPS.id_recipe=" +
    recipe_id;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});

//create new recipe
app.post("/recipes/new", (req, res) => {
  var recipe = req.body;
  var query =
    "insert into RECIPES (name,description,instructions) values ('" +
    recipe.name +
    "','" +
    recipe.description +
    "','" +
    recipe.instructions +
    "',)";
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});

// INGREDIENTS ROUTE
//get  ingredients
app.get("/ingredients/:query", (req, res) => {
  var recipe_query = req.params.query;
  var query =
    "select * from INGREDIENTS " +
    "where INGREDIENTS.name like '" +
    recipe_query +
    "%'";

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(err));
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});

app.listen(process.env.API_PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + process.env.API_PORT
    );
  else console.log("Error occurred, server can't start", error);
});
