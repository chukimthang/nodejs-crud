var http = require("http");
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var dateFormat = require("dateformat");
var now = new Date();

app.set("view engine", "ejs");

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/tether/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "node_tutorial_db"
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM events ORDER BY start_date DESC", function(err, result)
	{
    res.render("pages/index", {
      siteTitle: siteTitle,
      pageTitle: "Event Listing",
      items: result
    });
  });
});

const siteTitle = "NodeJs Example";
const baseURL = "http://localhost:3000"

app.listen(3000, "localhost", function(req, res){
	console.log("Listening 3000");
});
