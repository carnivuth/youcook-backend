//get recipes
module.exports = function (app, connection) {
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
      "')";
    connection.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify(err));
      } else {
        var result = JSON.stringify(rows);
        recipe_id = rows.insertId;
        recipe.ingredients.forEach((element) => {
          result = addIngredient(element, recipe_id);
        });
        console.log(result);
        res.send(result);
      }
    });
  });

  //remove recipe
  app.delete("/recipes/:id", (req, res) => {
    var recipe_id = req.params.id;
    var query =
      "select id_ingredient from QUANTITIES where id_recipe=" + recipe_id;

    connection.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify(err));
      } else {
        rows.forEach((element) => {
          removeReletion(recipe_id, element.id_ingredient);
        });
        var query = "delete from RECIPES " + "where id=" + recipe_id;
        connection.query(query, (err, rows, fields) => {
          if (err) {
            console.log(err);
            res.send(JSON.stringify(err));
          } else {
            console.log(rows);
            res.send(JSON.stringify(rows));
          }
        });
      }
    });
  });
  function removeReletion(recipe_id, id_ingredient) {
    var query =
      "delete from QUANTITIES where id_recipe=" +
      recipe_id +
      " and id_ingredient=" +
      id_ingredient;

    connection.query(query, (err, rows, fields) => {
      if (err) {
        return JSON.stringify(err);
      } else {
        return JSON.stringify(rows);
      }
    });
  }
  //update recipe
  app.put("/recipes/:id", (req, res) => {
    var recipe_id = req.params.id;
    var recipe = req.body;
    var query =
      "update RECIPES set name='" +
      recipe.name +
      "', instructions='" +
      recipe.instructions +
      "', description='" +
      recipe.description +
      "' where id=" +
      recipe_id;
    connection.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send(JSON.stringify(err));
      } else {
        //update relation with ingredients
        recipe.ingredients.forEach((element) => {
          var result = updateRelation(recipe_id, element);
        });
      }
    });
  });
  function updateRelation(recipe_id, ingredient) {
    var query =
      "update QUANTITIES set quantity='" +
      ingredient.quantity +
      "' where id_ingredient=" +
      ingredient.id +
      " and id_recipe=" +
      recipe_id;
    connection.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        //update relation with ingredients
        return rows;
      }
    });
  }

  //add ingredient to a recipe
  function addIngredient(element, recipe_id) {
    var query = "select id from  INGREDIENTS where name='" + element.name + "'";
    connection.query(query, (err, rows, fields) => {
      if (err) {
        return err;
      } else {
        //check for existance of ingredient
        if (rows.length == 0) {
          //create ingredient
          var query =
            "insert into INGREDIENTS(name) values('" + element.name + "')";
          connection.query(query, (err, rows, fields) => {
            if (err) {
              return err;
            } else {
              return createRelationWithIngredient(
                recipe_id,
                rows.insertId,
                element.quantity
              );
            }
          });
        } else {
          return createRelationWithIngredient(
            recipe_id,
            rows[0].id,
            element.quantity
          );
        }
      }
    });
  }
  //create relation with existing ingredient
  function createRelationWithIngredient(recipe_id, ingredient_id, quantity) {
    var query =
      "insert into QUANTITIES(id_recipe,id_ingredient,quantity) values(" +
      recipe_id +
      "," +
      ingredient_id +
      ",'" +
      quantity +
      "')";
    connection.query(query, (err, rows, fields) => {
      if (err) {
        return err;
      } else {
        return rows;
      }
    });
  }
};
