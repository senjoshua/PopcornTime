const functions = require('firebase-functions');
var express = require("express");
var app = express();
var path = require("path");

app.get('/', (req, res) => {
    let reqPath = path.join(__dirname, '../');
    res.sendFile(reqPath + "/public/index.html");
  });

app.post('/profile', (req, res) => {
    // let reqPath = path.join(__dirname, '../');
    // console.log(__dirname);
    res.sendFile(__dirname + '/public/profile.html');
});
  
app.get('/logout', (req, res) => {
    res.redirect('/');
});

exports.app = functions.https.onRequest(app);
