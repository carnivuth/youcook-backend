//express initialization
const express = require("express");
const app = express();

//dotenv config
require("dotenv").config();

//cors config
var cors = require("cors");
app.use(cors());

//bodyparser configuration
var bodyParser = require("body-parser");
//app.use(bodyParser.json());
app.use(express.json());

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

///////////////MAIN LOGIC

///////////////////HOME
app.get("/", (req, res) => {
  res.send(JSON.stringify(process.env.APP_NAME));
});

///////////////////////RECIPES ROUTE

require('./routes/recipes')(app,connection);

///////////////////////INGREDIENTS ROUTE
require('./routes/ingredients')(app,connection);

app.listen(process.env.API_PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " +
        process.env.API_PORT
    );
  else console.log("Error occurred, server can't start", error);
});
