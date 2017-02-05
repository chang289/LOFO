var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, function(error){
  if (error)
      console.log(error);
  else {
      console.log('mongo connected');
  }
});
app.use('/', express.static(__dirname + '/'));



const server = app.listen(port, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + port);
});
