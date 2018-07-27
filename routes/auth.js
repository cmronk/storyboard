var authController = require('../controllers/authcontroller.js');
var db = require("../models");


module.exports = function (app, passport) {

  app.get('/signup', authController.signup);

  app.get('/signin', authController.signin);

  app.get("/dashboard", function (req, res) {
    db.Storyboard.findAll({}).then(function (dbStoryboard) {
      res.render("dashboard", {
        Storyboards: dbStoryboard
      });
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    
    failureRedirect: '/signup'
  }
  ));

  app.get('/dashboard', isLoggedIn, authController.dashboard);

  app.get('/logout', authController.logout);

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  }
  ));

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/signin');
  }
}

