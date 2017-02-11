var expect = require('chai').expect;
var sinon = require('sinon');
var route = require('../app');
var Post = require("../model/mongoose/post");
var User = require("../model/mongoose/user");
var assert = require('assert');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('API for Posts and Users', () => {

  var newPostID;
  var newPost;
  var newUserID;

  describe('API for Post: create, edit, delete, get by email', () => {
      it('it should GET all the completed posts which are empty now', (done) => {
        chai.request(route)
            .get('/post/get/complete')
            .end((err, res) => {
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
              assert.equal(res.body.info, 'No posts found');
              done();
            });
      });

      it('it should Create a new post', (done) => {
        newPost = new Post({
          poster : "tester@lofo",
          title  : "Test post",
          description : "Create",
          tag         : 1,
          locationX   : 11,
          locationY   : 22,
          contact     : "tester@lofo",
          photo       : null,
          lost        : true,
        });
        // console.log(newPost);
        chai.request(route)
            .post('/post/create')
            .send(newPost)
            .end((err, res) => {

              assert.equal(res.body.info, 'Post created successfully');
              // console.log(res.body.data);
              assert.equal(res.body.data.poster, newPost.poster);
              assert.equal(res.body.data.title, newPost.title);
              assert.equal(res.body.data.description, newPost.description);
              assert.equal(res.body.data.tag, newPost.tag);
              assert.equal(res.body.data.locationX, newPost.locationX);
              assert.equal(res.body.data.locationY, newPost.locationY);
              assert.equal(res.body.data.contact, newPost.contact);
              assert.equal(res.body.data.photo, newPost.photo);
              assert.equal(res.body.data.lost, newPost.lost);
              newPostID=res.body.data._id;
              done();
            });
      });

      it('it should Edit an existed post', (done) => {
        newPost.description = "Edit";
        newPost.tag = 2;
        var url = "/post/edit/" + newPostID;
        // console.log(newPost);
        chai.request(route)
            .post(url)
            .send(newPost)
            .end((err, res) => {

              assert.equal(res.body.info, 'Posts updated');
              // console.log(res.body.data);
              assert.equal(res.body.data.poster, newPost.poster);
              assert.equal(res.body.data.title, newPost.title);
              assert.equal(res.body.data.description, newPost.description);
              assert.equal(res.body.data.tag, newPost.tag);
              assert.equal(res.body.data.locationX, newPost.locationX);
              assert.equal(res.body.data.locationY, newPost.locationY);
              assert.equal(res.body.data.contact, newPost.contact);
              assert.equal(res.body.data.photo, newPost.photo);
              assert.equal(res.body.data.lost, newPost.lost);
              newPostID=res.body.data._id;
              done();
            });
      });

      it('it tries to Edit a non-existed post', (done) => {
        newPost.description = "Edit";
        newPost.tag = 3;
        var url = "/post/edit/" + "589c4a58aaa9da085a34a0b9";
        // console.log(newPost);
        chai.request(route)
            .post(url)
            .send(newPost)
            .end((err, res) => {

              assert.equal(res.body.info, 'No such post');
              done();
            });
      });

      it('it tries to Edit a post with an invalid id', (done) => {
        newPost.description = "Edit";
        newPost.tag = 3;
        var url = "/post/edit/" + "1234567890";
        // console.log(newPost);
        chai.request(route)
            .post(url)
            .send(newPost)
            .end((err, res) => {

              assert.equal(res.body.info, 'error');
              done();
            });
      });

      it('it should Delete the post just created and edited', (done) => {
        var url = "/post/delete/" + newPostID
        chai.request(route)
            .delete(url)
            .end((err, res) => {
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
              assert.equal(res.body.info, 'Post delete');
              done();
            });
      });

      it('it tries to Delete a non-existed post', (done) => {
        var url = "/post/delete/" + "123456789"
        chai.request(route)
            .delete(url)
            .end((err, res) => {
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
              assert.equal(res.body.info, 'error');
              done();
            });
      });

  });

  describe('API for User: unique email, register, login', () => {
    it('it should Create a new user', (done) => {
      newUser = new User({
        email : "tester@lofo",
        username  : "Tester",
        password : "abc123",
      });
      // console.log(newPost);
      chai.request(route)
          .post('/user/signup')
          .send(newUser)
          .end((err, res) => {

            assert.equal(res.body.info, 'User created successfully');
            // console.log(res.body.data);
            assert.equal(res.body.data.email, newUser.email);
            assert.equal(res.body.data.username, newUser.username);
            assert.equal(res.body.data.password, newUser.password);
            newUserID=res.body.data._id;
            done();
          });
    });

    it('it should not Create a new user due to the repeated email used', (done) => {
      newUser = new User({
        email : "tester@lofo",
        username  : "Tester2",
        password : "abc123",
      });
      // console.log(newUser);
      chai.request(route)
          .post('/user/signup')
          .send(newUser)
          .end((err, res) => {

            assert.equal(res.body.info, 'error');
            done();
          });
    });

    it('it should enter login the user we just created', (done) => {
      var user = {
        email : "tester@lofo",
        password : "abc123",
      };
      chai.request(route)
          .post('/user/login')
          .send(user)
          .end((err, res) => {

            assert.equal(res.body.info, 'Login successfully');
            assert.equal(res.body.data.email, user.email);
            assert.equal(res.body.data.password, user.password);
            done();
          });
    });

    it('it should fail to login due to the non-existed email', (done) => {
      var user = {
        email : "test@lofo",
        password : "abc123",
      };
      chai.request(route)
          .post('/user/login')
          .send(user)
          .end((err, res) => {

            assert.equal(res.body.info, 'No such user');
            done();
          });
    });

    it('it should fail to login due to the wrong password', (done) => {
      var user = {
        email : "tester@lofo",
        password : "abcd1234",
      };
      chai.request(route)
          .post('/user/login')
          .send(user)
          .end((err, res) => {

            assert.equal(res.body.info, 'Password invalid');
            done();
          });
    });

    it('Delete the tester account', (done) => {
      var url = "/user/delete/" + newUserID
      // console.log("url now: " + url);
      chai.request(route)
          .delete(url)
          .end((err, res) => {

            assert.equal(res.body.info, 'User delete');
            done();
          });
    });

  });

});
