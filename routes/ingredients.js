module.exports=function(app,connection){
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
  }