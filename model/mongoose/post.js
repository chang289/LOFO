"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var postSchema = new mongoose.Schema({
    fullname: String,
    title: String,
    description: String,
    tag: [Number],
    location: [Number],
    contact: String,
    photo: String,
    lost: Boolean,
    createTime: { type: Date, default: new Date() },
    modifiedTime: { type: Date, default: new Date() },
    complete: { type: Boolean, default: 0 },
});
var Post = mongoose.model("Post", postSchema);
module.exports = Post;
//# sourceMappingURL=post.js.map