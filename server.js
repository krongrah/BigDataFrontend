#!/usr/bin/env nodejs
const express = require("express"),
  app = express(),
  http = require("http").Server(app),
  port = 3000,
  ip = "localhost",
  path = require("path")
;


//Defaults public path
var public = "public";
var graphs = "public/graphs";

//Publish specific paths to the client
app.use(express.static(public));
app.use(express.static(graphs));

//Listens for connections
app.listen(port, () =>
  console.log("WebUI listening at http://" + ip + ":" + port)
);

//Default request
app.get("/", function (req, res) {
  res.sendFile(path.join(public, "index.html"));
});

