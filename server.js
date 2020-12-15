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
	fetch("http://localhost:9870/webhdfs/v1/user/hadoop/twitter-java-save-txt/V01Sql.1608024278655/?op=LISTSTATUS")
	.then(response => response.json())
	.then(text => {
		var file = text.FileStatuses.FileStatus
		file.forEach(line => {
			var f = line
			//Identify files (parts)
			if(f.pathSuffix.substr(0,4) == "part"){
				console.log("Sending file with name: " + f.pathSuffix)

				//Getting the specific content of the file
				fetch("http://localhost:9870/webhdfs/v1/user/hadoop/twitter-java-save-txt/V01Sql.1608024278655/" + f.pathSuffix + "?op=OPEN")
				.then(response => response.text())
				.then(file => file.split("\n"))
				.then(tweets => {
					//For each tweet in the file of tweets, send to the client
					tweets.forEach(tweet => {
						try{
							totalHistTweets.push(JSON.parse(tweet))
						}catch(err){
							//console.log("Caused by: " + tweet)
							//console.log(err)
						}
					})
				})
			}
		})
	})
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