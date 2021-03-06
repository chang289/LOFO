var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Post = require("./model/mongoose/post");
var User = require("./model/mongoose/user");
// var routes = require('./model/api/posts');
var Token = require("./model/mongoose/token");
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var uuidV1 = require('uuid/v1');
var sg = require('sendgrid')('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');

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
  //testing code for expired post
  // var nw = new Date();
  // nw.setMonth(nw.getMonth() - 2);
  // newPost.createTime = nw;
  newPost.save((err)=>{
      if (err){
          return res.json({info: 'error', error: err});
      }
      res.json({info: 'Post created successfully', data: newPost});
  });
});

//display all ongoing post
app.get('/post/get/ongoing', function(req, res) {
  var nw = new Date();
  nw.setDate(nw.getDate() - 30);
  console.log(nw);

  Post.find({
      "complete": 0,
      "createTime": {$gte: nw}
    })
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
  var nw = new Date();
  nw.setDate(nw.getDate() - 30);

  Post.find({
      "complete": 1,
      "createTime": {$gte: nw}
    })
    .sort({ modifiedTime: -1 })
    .exec(function(err, post){
      if (err){
          return res.json({info: 'error', error: err});
      }
      if (post.length == 0) {res.json({info: 'No posts found'});}
      else {res.json({info: 'Posts found', data: post}); }
    });
});

//display all expired post
app.get('/post/get/expired', function(req, res) {
  var nw = new Date();
  nw.setDate(nw.getDate() - 30);
  console.log(nw);

  Post.find({
      "createTime": {$lte: nw}
    })
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
    if(err) {return res.json({info: 'error', error: err});}
    var nw = new Date();
    nw.setDate(nw.getDate() - 30);
    if (!post) {return res.json({info: 'No post found'});}
    if (post.createTime < nw) {return res.json({info: 'Post expired'});}
    res.json({info: 'Post found', data: post});
  });
});

//get post by poster's email
app.get('/post/get/email/:poster', function(req, res){
  var nw = new Date();
  nw.setDate(nw.getDate() - 30);

  Post.find( {
    'poster': req.params.poster,
    "createTime": {$gte: nw}
  })
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
    var nw = new Date();
    nw.setDate(nw.getDate() - 30);
    if (post.createTime < nw) {return res.json({ info : 'Post expired'});}

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
  Token.findOne({'email': req.body.email}, function(err, token) {
    if (token) {
      if (token.initToken == req.body.token) {
        var newUser = new User(req.body);
        newUser.save((err)=>{
          if (err){
              return res.json({info: 'error', error: err});
            }
            res.json({info: 'User created successfully', data: newUser});
        });
      } else { res.json({info: 'Wrong token'}); }
    } else {return res.json({info: 'No such token'});}
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

// app.post('/image/upload', multipartMiddleware, function(req, res) {
//   console.log(req.files);
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
    var nw = new Date();
    nw.setDate(nw.getDate() - 30);
    if (req.params.tag == -1) {
      Post.find({
        "complete": 0,
        "createTime": {$gte: nw}
      })
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
        "complete": 0,
        "createTime": {$gte: nw}
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
  // console.log(req.params.starterDate);
  // console.log(req.params.endDate);
  var nw = new Date();
  nw.setDate(nw.getDate() - 30);

  // console.log(start);
  // console.log(end);
  // start = start.toISOString();
  // end = end.toISOString();
  // console.log(start);
  // console.log(end);

  if (req.params.starterDate == "undefined" || req.params.endDate == "undefined") {
    Post.find({
      "complete": 0 ,
      "createTime": {$gte: nw}
    })
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
    var start = new Date(req.params.starterDate);
    var end = new Date(req.params.endDate);
    end.setDate(end.getDate() + 1);

    Post.find({
      "modifiedTime": {$gte: start, $lte: end},
      "complete": 0,
      "createTime": {$gte: nw}
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
  var nw = new Date();
  nw.setDate(nw.getDate() - 30);

  if (req.params.lost == "All") {
    Post.find({
      "complete": 0 ,
      "createTime": {$gte: nw}
    })
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
      "complete": 0,
      "createTime": {$gte: nw}
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

//send verification email
app.post('/user/init/send', function(req,res){
  async.waterfall([
    function(done){
      crypto.randomBytes(3, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done){
      Token.findOne({ 'email': req.body.email }, function(err, user){
        if (!user) {
          var newToken = new Token();
          newToken.email = req.body.email;
          newToken.initToken = token;
          newToken.save((err)=>{
              done(err, token, newToken);
          });
        } else {
          console.log(user);
          user.initToken = token;
          // user.resetExpires = Date.now() + 3600000; // 30min
          user.save(function(err) {
            done(err, token, user);
          });
        }
      });
    },
    function(token, user, done){
      var helper = require('sendgrid').mail;
      var from_email = new helper.Email('noreply@LOFO.com');
      var to_email = new helper.Email(user.email);
      var subject = 'Account initilization';
      var content = new helper.Content('text/plain', 'You are receiving this because you try to signup a LOFO account through this email.\n\n' +
      'Your initilization token is ' + token + '\n\n');

      var mail = new helper.Mail(from_email, subject, to_email, content);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        if (error) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
          return res.json({info: 'send fail'});
        }
        else {res.json({info: 'send success', data: token});}
      });
    }
  ], function(err) {
      if (err) return res.json({info: 'error', error: err});
        // res.redirect('back');
  });
});

// app.post('/user/init/verify', function(req,res){
//   User.findOne({ 'email': req.body.email }, function(err, user){
//     if (req.body.token != user.initToken) {
//       return res.json({info: 'No such user'});
//     }
//     user.initToken = undefined;
//     user.initialize = true;
//     user.save(function(err, user){
//       if(err)
//         return res.json({info: 'error', error: err});
//       res.json({info: 'User verified', data: user});
//     });
//   });
// });

app.post('/user/report', function(req, res) {

  var hostemail = 'changketao233@gmail.com';
  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('noreply@LOFO.com');
  var to_email = new helper.Email(hostemail);
  var subject = 'Report';
  var content = new helper.Content('text/plain', req.body.description + '\n\n' +
  'Reporter information:' + req.body.contact + '\n\n');

  var mail = new helper.Mail(from_email, subject, to_email, content);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    if (error) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
      res.json({info: 'send fail'});
    }
    else {res.json({info: 'send success'});}
  });
});

const server = app.listen(port, function(err) {
  if (err) {
      console.log(err);
      return;
  }
  console.log("Listening on port " + port);
});

module.exports = app;