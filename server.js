var express = require("express");
var app = express();
var server = require("http").createServer(app);
// var firebase = require("firebase-admin");

app.use(express.static(__dirname + "/public"));
    
server.listen(process.env.PORT || 8080);
app.get("/", function(req, res){
     res.sendFile(__dirname + "/public/index.html");
});