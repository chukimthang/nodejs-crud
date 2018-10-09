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

// index
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

// new
app.get("/events/new", function(req, res) {
  res.render("pages/new", {
    siteTitle: siteTitle,
    pageTitle: "Event Add",
    items: ""
  });
});

// create
app.post("/events/create", function(req, res) {
  var insertEventData = {
    name: req.body.name,
    location: req.body.location,
    desc: req.body.desc,
    start_date: dateFormat(req.body.start_date, 'yyyy-mm-dd'),
    end_date: dateFormat(req.body.end_date, 'yyyy-mm-dd')
  }	

  connection.query("INSERT INTO events SET ? ", insertEventData , function(err, result){    
    res.redirect(baseURL);
  });
});

// edit
app.get("/events/:id/:edit", function(req, res) {
  connection.query("SELECT * FROM events WHERE id = ? ", req.params.id, function(err, result)
	{
    result[0].start_date = dateFormat(result[0].start_date, "yyyy-mm-dd")
    result[0].end_date = dateFormat(result[0].end_date, "yyyy-mm-dd")

    res.render('pages/edit', {
      siteTitle: siteTitle,
      pageTitle: "Event Edit: " + result[0].name,
      item: result
    });
  });	
});

// update
app.post("/events/:id/:update", function(req, res) {
  connection.query("UPDATE events SET name = ?, desc = ? , location = ? , start_date = ? , end_date = ? WHERE id = ? ", [ req.body.name, req.body.desc , req.body.location, req.body.start_date, req.body.end_date, req.params.id ] , function(err, result) 
  {
		if (result.affectedRows) {
      res.redirect(baseURL);
    }
  });
});

app.post("/events/:id/:update", function(req, res) {
  connection.query("UPDATE events SET name = ?, desc = ? , location = ? , start_date = ? , end_date = ? WHERE id = ? ", [ req.body.name, req.body.desc , req.body.location, req.body.start_date, req.body.end_date, req.params.id ] , function(err, result) 
	{
      res.redirect(baseURL);
  });	
})

const siteTitle = "NodeJs Example";
const baseURL = "http://localhost:3000"

app.listen(3000, "localhost", function(req, res){
	console.log("Listening 3000");
});
