var express = require("express");
var app = express();
var server = require("http").createServer(app);
var firebase = require("firebase");


app.use(express.static(__dirname + "/public"));
    
server.listen(process.env.PORT || 8080);
app.get("/", function(req, res){
     res.sendFile(__dirname + "/public/index.html");
});

app.post('/profile', function(req, res) {
     //add here
     // res.redirect(__dirname  + '/public/temp.html');
     res.sendFile(__dirname + "/public/temp.html");
});

// app.post("/logout", function (req, res) {
//      req.logout();
//      req.session.destroy();
//      res.send({err: 0, redirectUrl: "/"});
//    });

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDf9K0vWDDZ0wYKN7sB7awYc29Ame97eh0",
    authDomain: "web-app19.firebaseapp.com",
    databaseURL: "https://web-app19.firebaseio.com",
    projectId: "web-app19",
    storageBucket: "web-app19.appspot.com",
    messagingSenderId: "888088331447"
  };
  firebase.initializeApp(config);