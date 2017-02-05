// import * as express from "express";
import * as Post from "../mongoose/post";
import * as mongoose from "mongoose";

module.exports = (app) => {
  app.post('/post', function (req, res){
    var newPost = new Post(req.body);
    newPost.save((err)=>{
        if (err){
            res.json({info: 'error', error: err});
        }
        res.json({info: 'Post created successfully', data: newPost});
    });
  });
};
