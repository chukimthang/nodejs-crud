// var http = require("http");

// http.createServer(function (request, response) {
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.end("Hello World\n");
// }).listen(8000);

// console.log("Server dang chay tai http://127.0.0.1:8000/");

var http = require('http');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

// parser all form data
app.use(bodyParser.urlencoded({ extended: true }));
