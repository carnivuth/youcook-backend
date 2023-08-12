require("dotenv").config();
const express = require("express");

const app = express();
var cors = require('cors');
app.use(cors());
const PORT = process.env.API_PORT;
//dbsetup
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

//get  ingredients
app.get("/ingredients/:query", (req, res) => {
  var recipe_query = req.params.query;
  var query =
    "select * from INGREDIENTS " +
    "where INGREDIENTS.name like '%" +recipe_query+"%'";

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

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
