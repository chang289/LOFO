"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var postSchema = new mongoose.Schema({
    poster: { type: Schema.Types.ObjectId, ref: 'User' },
    fullname: String,
    title: String,
    description: String,
    tag: Number,
    locationX: Number,
    locationY: Number,
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