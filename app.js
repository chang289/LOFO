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
var port = process.env.PORT || 4200;
mongoose.connect("mongodb://tester:abc123@ds021166.mlab.com:21166/playground", function(error){
  if (error)
      console.log(error);
  else {
      console.log('mongo connected');
  }
});


// routes(app);

app.use('/', express.static(__dirname + '/dist'));
//create new post
//create new post
app.use('/', express.static(__dirname + '/'));

//create new post
app.post('/post/create', function (req, res){
  var newPost = new Post(req.body);
  newPost.save((err)=>{
      if (err){
          return res.json({info: 'error', error: err});
      }
      res.json({info: 'Post created successfully', data: newPost});
  });
});

//display all ongoing post
app.get('/post/get/ongoing', function(req, res) {
  Post.find({ "complete": 0 })
    .sort({ modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
});

//display all complete post
app.get('/post/get/complete', function(req, res) {
  Post.find({ "complete": 1 })
    .sort({ modifiedTime: -1 })
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
    if (!post)
      return res.json({info: 'No post found'});
    res.json({info: 'Post found', data: post});
  });
});

//get post by poster's email
app.get('/post/get/email/:poster', function(req, res){
  Post.find( {'poster': req.params.poster})
  .sort({ modifiedTime: -1 })
  .exec(function(err, post){
    if(err)
      return res.json({info: 'error', error: err});
    if (post.length == 0)
      return res.json({info: 'No post found'});
    res.json({info: 'Post found', data: post});
  });
});

//delete post by id
app.delete('/post/delete/:id', function(req, res){
  //remove post by ID
  Post.remove({ _id: req.params.id }, function(err){
    if(err)
      return res.json({info: 'error', error: err});
    res.json({ info : 'Post delete'});
  });
});

//delete all post with title contains "test"
app.delete('/post/deleteAll', function(req, res){
  //remove post by ID
  Post.remove({ "title" : {$regex : ".*test.*"} }, function(err){
    if(err)
      return res.json({info: 'error', error: err});
    res.json({ info : 'Post delete'});
  });
});

//edit post by id
app.post('/post/edit/:id', function(req, res){
  Post.findById(req.params.id, function (err, post) {
    if(err)
      return res.json({info: 'error', error: err});
    if(!post){
      return res.json({ info : 'No such post'});
    }
    post.fullname = req.body.fullname;
    post.title = req.body.title;
    post.description = req.body.description;
    post.tag = req.body.tag;
    post.contact = req.body.contact;
    post.photo = req.body.photo;
    post.modifiedTime = new Date();
    post.complete = req.body.complete;
    post.confirmer = req.body.confirmer;

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
      return res.json({ info : 'No such user'});
    }
    if (req.body.password == user.password) {
      res.json({info: 'Login successfully', data: user});
    } else { res.json({ info : 'Password invalid'}); }
  })
});

//delete user by id
app.delete('/user/delete/:id', function(req, res){
  //remove user by ID
  User.remove({ _id: req.params.id }, function(err){
    if(err)
      return res.json({info: 'error', error: err});
    res.json({ info : 'User delete'});
  });
});

// app.post('/image/upload', function(req, res) {
//   // console.log(req.files);
//   var file = req.files.file;
//   var stream = fs.createReadStream(file.path);
//   var uid = uuidV1() + "." + req.body.format;
//   console.log(uid);
//   s3fsImpl.writeFile(uid, stream).then(function(){
//     // fs.unlink(req.body.path, function(err){
//     //   if (err)
//     //     console.log("Sending failed");
//       return res.send('https://s3.amazonaws.com/lofo-purdue/' + uid);
//     // });
//   });
// });

//ascending
app.get('/post/sort/:tag/:starterDate/:endDate/:lost/asc', function(req, res){

  Post.find({
    "tag": {"$eq": req.params.tag},
    "lost": {"$eq": req.params.lost},
    "modifiedTime": {$gte: req.params.starterDate, $lte: req.params.endDate},
    "complete": 0
  })
  .sort({ modifiedTime: 1 })
  .exec(function(err, posts){
    if (err){
        return res.json({info: 'error', error: err});
    }
    if (posts.length == 0) {res.json({info: 'No posts found'});}
    else {res.json({info: 'Posts found', data: posts}); }
  });
});

//descending
app.get('/post/sort/:tag/:starterDate/:endDate/:lost/des', function(req, res){

    Post.find({
      "tag": {"$eq": req.params.tag},
      "lost": {"$eq": req.params.lost},
      "modifiedTime": {$gte: req.params.starterDate, $lte: req.params.endDate},
      "complete": 0
    })
    .sort({ modifiedTime: -1 })
    .exec(function(err, posts){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (posts.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: posts}); }
    });
});

app.get('/post/sort/tag/:tag', function(req, res){
    if (req.params.tag == -1) {
      Post.find({ "complete": 0 })
      .sort({ modifiedTime: -1 })
      .exec(function(err, post){
        if (err){
            return res.json({info: 'error', error: err});
        }
        if (post.length == 0) {res.json({info: 'No posts found'});}
        else {res.json({info: 'Posts found', data: post}); }
      });
    }
    else {
      Post.find({
        "tag": {"$eq": req.params.tag},
        "complete": 0
      })
      .sort({ modifiedTime: -1 })
      .exec(function(err, posts){
        if (err){
            return res.json({info: 'error', error: err});
        }
        if (posts.length == 0) {res.json({info: 'No posts found'});}
        else {res.json({info: 'Posts found', data: posts}); }
      });
    }
});

app.get('/post/sort/date/:starterDate/:endDate', function(req, res){
  var start = new Date(req.params.starterDate);
  var end = new Date(req.params.endDate);
  end.setDate(end.getDate() + 1);

  if (req.params.starterDate == "undefined" || req.params.endDate == "undefined") {
    Post.find({ "complete": 0 })
    .sort({ modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
  }
  else {
    Post.find({
      "modifiedTime": {$gte: start, $lte: end},
      "complete": 0
    })
    .sort({ modifiedTime: -1 })
    .exec(function(err, posts){

      if (err){
          return res.json({info: 'error', error: err});
      }
      if (posts.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: posts}); }
    });
  }
});

app.get('/post/sort/lost/:lost', function(req, res){
  if (req.params.lost == "undefined") {
    Post.find({ "complete": 0 })
    .sort({ modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
  }
  else {
    Post.find({
      "lost": {"$eq": req.params.lost},
      "complete": 0
    })
    .sort({ modifiedTime: -1 })
    .exec(function(err, posts){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (posts.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: posts}); }
    });
  }
});


const server = app.listen(port, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + port);
});

module.exports = app;