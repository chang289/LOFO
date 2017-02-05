var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
mongoose.connect(process.env.MONGO_URL, function(error){
  if (error)
      console.log(error);
  else {
      console.log('mongo connected');
  }
});
app.get('/', function(req, res, next) {
    res.render('index.html');
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = app.listen(3000, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + 3000);
});

module.exports = app;
