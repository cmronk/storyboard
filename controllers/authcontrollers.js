var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};

var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("index");
};

exports.signin = function(req, res) {
  res.render("index");
};

exports.dashboard = function(req, res) {
  res.render("index");
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
