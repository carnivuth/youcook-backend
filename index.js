const express = require("express");

const app = express();
const PORT = 8039;
//dbsetup
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "homestead",
  user: "homestead",
  password: "secret",
  database: "youcook",
});

connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////RECIPES ROUTE

//get recipes
app.get("/recipes", (req, res) => {
  var query = "select * from RECIPES";

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.send('{"error":"error"}');
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});

//get ingredients
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
      res.send('{"error":"error"}');
    } else {
      var result = JSON.stringify(rows);
      console.log(result);
      res.send(result);
    }
  });
});
//get steps
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
      res.send('{"error":"error"}');
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
