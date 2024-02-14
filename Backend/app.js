var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();
// connect to db and start server
require('./schemas/db');

console.log('Booting....');
// app.use(express.static(path.join(__dirname, 'public')));

// redirect all api calls to index router
app.use("/api", indexRouter);

// run server
var port = process.env.PORT;
const server = app.listen(port || 8000, function () {
  var port = server.address().port;
  console.log("server listening at port %s\n", port);
});

module.exports = app;
