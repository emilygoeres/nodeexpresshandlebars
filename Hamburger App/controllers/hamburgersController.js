var express = require("express");

var router = express.Router();

// Import the model (hamburger.js) to use its database functions.
var hamburger = require("../models/hamburger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  hamburger.all(function(data) {
    var hbsObject = {
      hamburgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/hamburgers", function(req, res) {
  hamburger.create([
    "name", "devour"
  ], [
    req.body.name, req.body.devour
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/hamburgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  hamburger.update({
    devour: req.body.devour
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/hamburgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  hamburger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
