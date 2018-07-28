var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {


  // Load example page and pass in an example by id
  app.get("/main/:id", function (req, res) {
    db.Storyboard.findOne({
      where: { id: req.params.id }
    }).then(function (dbStoryboard) {
      res.render("dashboard", {
        Storyboards: dbStoryboard
      });
    });
  });

  // Load dashboard page
  app.get("/dashboard", function (req, res) {
    db.Storyboard.findAll({}).then(function (dbStoryboard) {
      res.render("dashboard", {
        Storyboards: dbStoryboard
      });
    });
  });


  app.get("/logout", function (req, res) {
    res.redirect("/signin");
  })
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};



