var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Post = require("./model/mongoose/post");
// var routes = require('./model/api/posts');

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


// routes(app);

app.use('/', express.static(__dirname + '/'));
app.post('/post', function (req, res){
  var newPost = new Post(req.body);
  newPost.save((err)=>{
      if (err){
          res.json({info: 'error', error: err});
      }
      res.json({info: 'Post created successfully', data: newPost});
  });
});

const server = app.listen(port, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + port);
});
