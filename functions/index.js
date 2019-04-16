const functions = require('firebase-functions');
var express = require("express");
var app = express();
var path = require("path");

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.post('/profile', (req, res) => {
    let reqPath = path.join(__dirname, '../');
    res.sendFile(reqPath + '/public/temp.html');
});
  
exports.app = functions.https.onRequest(app);

// // app.post("/logout", function (req, res) {
// //      req.logout();
// //      req.session.destroy();
// //      res.send({err: 0, redirectUrl: "/"});
// //    });
