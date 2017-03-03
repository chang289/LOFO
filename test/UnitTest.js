var expect = require('chai').expect;
var sinon = require('sinon');
var route = require('../app');
var Post = require("../model/mongoose/post");
var User = require("../model/mongoose/user");
// var assert = require('assert');

var chai = require('chai');
var assert = chai.assert;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('API for Posts and Users', () => {

  var newPostID;
  var newPost;
  var newUserID;

  describe('API for Post: create, edit, delete, get by email', () => {
      it('it should GET all the completed posts', (done) => {
        chai.request(route)
            .get('/post/get/complete')
            .end((err, res) => {
                // res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                var posts = res.body.data;
                if (res.body.info != 'No posts found') {
                  for (var i = 0; i < posts.length; i++) {
                    // console.log("Loop: %d, tag: %d\n",i,posts[i].tag);
                    assert.equal(posts[i].complete, 1);
                  }
                }

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

      it('it should Get the posts which have tag: 1', (done) => {
        var url = '/post/sort/tag/1';
        chai.request(route)
            .get(url)
            .end((err, res) => {
              var posts = res.body.data;
              for (var i = 0; i < posts.length; i++) {
                // console.log("Loop: %d, tag: %d\n",i,posts[i].tag);
                assert.equal(posts[i].tag, 1);
              }
              done();
            });
      });

      it('it should Get the posts which have all kinds of tag', (done) => {
        var url = '/post/sort/tag/-1';
        chai.request(route)
            .get(url)
            .end((err, res) => {
              var posts = res.body.data;
              var tag_1 = 0;
              var tag_2 = 0;
              var tag_3 = 0;
              for (var i = 0; i < posts.length; i++) {
                // console.log("Loop: %d, tag: %d\n",i,posts[i].tag);
                if (!tag_1 && posts[i].tag == 1) {tag_1 = 1;}
                else if (!tag_2 && posts[i].tag == 2) {tag_2 = 1;}
                else if (!tag_3 && posts[i].tag == 3) {tag_3 = 1;}
                if (tag_1 && tag_2 && tag_3) {break;}
              }
              assert.equal(tag_1, 1);
              assert.equal(tag_2, 1);
              assert.equal(tag_3, 1);
              done();
            });
      });

      it('it should Get the posts which are lost', (done) => {
        var url = '/post/sort/lost/0';
        chai.request(route)
            .get(url)
            .end((err, res) => {
              var posts = res.body.data;
              for (var i = 0; i < posts.length; i++) {
                // console.log("Loop: %d, tag: %d\n",i,posts[i].tag);
                assert.equal(posts[i].lost, 0);
              }
              done();
            });
      });

      it('it should Get the posts which are both lost and found', (done) => {
        var url = '/post/sort/lost/All';
        chai.request(route)
            .get(url)
            .end((err, res) => {
              var posts = res.body.data;
              var tag_lost = 0;
              var tag_found = 0;
              for (var i = 0; i < posts.length; i++) {
                // console.log("Loop: %d, tag: %d\n",i,posts[i].tag);
                if (!tag_lost && posts[i].lost == 0) {tag_lost = 1;}
                else if (!tag_found && posts[i].lost == 1) {tag_found = 1;}
                if (tag_lost && tag_found) {break;}
              }
              assert.equal(tag_lost, 1);
              assert.equal(tag_found, 1);
              done();
            });
      });

      it('it should Get the posts within specific time intervals', (done) => {
        var now = new Date();
        var min = new Date(Date.now() - 180000).toISOString();
        var max = new Date(Date.now() + 180000).toISOString();

        var url = '/post/sort/date/'+ min +'/'+ max;
        chai.request(route)
            .get(url)
            .end((err, res) => {
              // console.log(res.body);
              var posts = res.body.data;
              var tag_lost = 0;
              var tag_found = 0;
              // console.log("Length: %d\n", posts.length);
              // console.log(posts[0]);
              for (var i = 0; i < posts.length; i++) {
                // console.log(posts[i]);
                // console.log("Loop: %d\n",i);
                  assert.isAtLeast(posts[i].modifiedTime, min);
                  assert.isAtMost(posts[i].modifiedTime, max);
              }
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
