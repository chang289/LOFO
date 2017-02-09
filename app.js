var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Post = require("./model/mongoose/post");
var User = require("./model/mongoose/user");
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

//create new post
app.post('/post/create', function (req, res){
  var newPost = new Post(req.body);
  newPost.save((err)=>{
      if (err){
          return res.json({info: 'error', error: err});
      }
      User.findById( req.body.poster, function(err, user) {
        user.history.push(newPost._id);
        user.save((err)=>{
            if (err){
                return res.json({info: 'error', error: err});
            }
            res.json({info: 'Post created successfully', data: newPost});
        });
      })
  });
});

//display all ongoing post
app.get('/post/get/ongoing', function(req, res) {
  Post.find({ "complete": 0 })
    .sort({ createTime: -1 , modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
});

//display all ongoing post
app.get('/post/get/complete', function(req, res) {
  Post.find({ "complete": 1 })
    .sort({ createTime: -1 , modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
});

//get post by id
app.get('/post/get/:id', function(req, res){
  Post.findById(req.params.id, function (err, post) {
    if(err)
      return res.json({info: 'error', error: err});
    res.json({info: 'Post found', data: post});
  });
});

//delete post by id
app.delete('/post/delete/:id', function(req, res){
  //remove post by ID
  Post.remove({ _id: req.params.id }, function(err){
    if(err)
      return res.json({info: 'error', error: err});
    res.json({ message : 'Post delete'});
  });
});

//delete all post with title contains "test"
app.delete('/post/deleteAll', function(req, res){
  //remove post by ID
  Post.remove({ "title" : {$regex : ".*Test.*"} }, function(err){
    if(err)
      return res.json({info: 'error', error: err});
    res.json({ message : 'Post delete'});
  });
});

//edit post by id
app.post('/post/edit/:id', function(req, res){
  Post.findById(req.params.id, function (err, post) {
    if(err)
      return res.json({info: 'error', error: err});
    if(!post){
      return res.json({ message : 'No such post'});
    }
    post.fullname = req.body.fullname;
    post.title = req.body.title;
    post.description = req.body.description;
    post.tag = req.body.tag;
    post.contact = req.body.contact;
    post.photo = req.body.photo;
    post.modifiedTime = new Date();

    post.save(function(err, po){
      if(err)
        return res.json({info: 'error', error: err});
      res.json({info: 'Posts updated', data: post});
    });
  });
});

//signup
app.post('/user/signup', function(req, res) {
  var newUser = new User(req.body);
  newUser.save((err)=>{
      if (err){
          return res.json({info: 'error', error: err});
      }
      res.json({info: 'User created successfully', data: newUser});
  });
});

//login
app.post('/user/login', function(req, res) {
  User.findOne({'email': req.body.email}, function(err, user) {
    if(err)
      return res.json({info: 'error', error: err});
    if (!user) {
      return res.json({ message : 'No such user'});
    }
    if (req.body.password == user.password) {
      res.json({info: 'Login successfully', data: user});
    } else { res.json({ message : 'Password invalid'}); }
  })
});

const server = app.listen(port, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + port);
});
