#!/usr/bin/env nodejs
const express = require("express"),
  app = express(),
  http = require("http").Server(app),
  port = 3000,
  ip = "localhost",
  path = require("path"),
  fetch = require("node-fetch");
  utf8 = require('utf8'),
  fileReader = require('./FileReader.js')
;


var totalHistTweets = []

//Defaults public path
var public = 	"public"
var graphs = 	"public/graphs"
var style = 	"public/css"

//Publish specific paths to the client
app.use(express.static(public))
app.use(express.static(graphs))
app.use(express.static(style))

//Listens for connections
app.listen(port, () => {
  	console.log("WebUI listening at http://" + ip + ":" + port)
	fileReader.readHistoricalData(totalHistTweets)
})

//Default request
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, public, "index.html"))
})

//Historical page request
app.get("/historical", function (req, res) {
  res.sendFile(path.join(__dirname, public, "historical.html"))
})

app.get("/histdata", function (req, res) {
	console.log("Server finished transmitting " + totalHistTweets.length + " files..")
	res.send(totalHistTweets)
})

app.get("/live", function (req, res) {
	res.sendFile(path.join(__dirname, public, "live.html"))
})

app.get("/livedata", function (req, res) {
	console.log("Live data request")
})