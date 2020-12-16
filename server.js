#!/usr/bin/env nodejs
const express = require("express"),
  app = express(),
  http = require("http").Server(app),
  port = 3000,
  ip = "localhost",
  path = require("path"),
  fetch = require("node-fetch");
  utf8 = require('utf8');
;

const jsonBigint = require("json-bigint");


//Defaults public path
var public = 	"public"
var graphs = 	"public/graphs"
var style = 	"public/css"


const odbc = require('odbc');
const connectionString = "DSN=OdbcHive;Host=localhost;Port=10000";

//Publish specific paths to the client
app.use(express.static(public))
app.use(express.static(graphs))
app.use(express.static(style))

//Listens for connections
app.listen(port, () =>
  console.log("WebUI listening at http://" + ip + ":" + port)
)

//Default request
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, public, "index.html"))
})

//Wordclouds page request
app.get("/wordClouds", function (req, res) {
  res.sendFile(path.join(__dirname, public, "word_clouds.html"))
})

//Wordclouds with Hive page request
app.get("/wordCloudsHive", function (req, res) {
	res.sendFile(path.join(__dirname, public, "word_clouds_hive.html"))
})

//Get from HDFS
app.get("/histdata", function (req, res) {
	fetch("http://localhost:9870/webhdfs/v1/user/hadoop/twitter-java-save-txt/V01Sql.1607699461165/?op=LISTSTATUS")
		.then(response => response.text())
		.then(text => {
			console.log(text)
		})

  fetch("http://localhost:9870/webhdfs/v1/user/hadoop/twitter-java-save-txt/V01Sql.1607703257298/part-00000?op=OPEN")
	.then(response => response.text())
	.then(text => res.json(utf8.encode(text)))
})

app.get("/hive/neg", function (req, res) {
	odbc.connect(connectionString, ((error, connection) => {
		if (error) {
			console.log(error)
		}
		console.log(connection.query("SELECT explode(negativewords) as word FROM default.avro_tbl;", ((error1, result) => {
			if (error1) {
				console.log(error1)
			}
			res.end(jsonBigint().stringify(result));
		})))
	}));
})

app.get("/hive/pos", function (req, res) {
	odbc.connect(connectionString, ((error, connection) => {
		if (error) {
			console.log(error)
		}
		console.log(connection.query("SELECT explode(positivewords) as word FROM default.avro_tbl;", ((error1, result) => {
			if (error1) {
				console.log(error1)
			}
			res.end(jsonBigint().stringify(result));
		})))
	}));
})
