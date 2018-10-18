require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var mysql = require("mysql");
var path = require("path");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "storyboardDB"
  });
}

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, './public')));

// For Passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get('/', function(req, res){
res.redirect('signin');
});

//Models
var models = require("./models");

// Routes

require("./routes/apiRoutes")(app);

require("./routes/userRoutes")(app);
var authRoute = require("./routes/auth.js")(app, passport);

require("./config/passport/passport.js")(passport, models.User);

require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// socket logic
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
 users = [];
connections = [];
 server.listen(process.env.PORT || 5000);
console.log("server running");
 app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
 io.sockets.on("connection", function (socket) {
    connections.push(socket);
    console.log("connected: %s sockets connected", connections.length);
     // disconnect
    socket.on("disconnect", function (data) {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);
    });
     // send message
    socket.on("send message", function(data){
        console.log(data);
        io.sockets.emit("new message", {msg: data, user: socket.username});
    });
     // new user
    socket.on("new user", function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });
     function updateUsernames(){
        io.sockets.emit("get users", users);
    }
});

connection.connect();
module.exports = connection;
module.exports = app;