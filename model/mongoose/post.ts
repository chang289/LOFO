import * as mongoose from "mongoose";
import {protoPost} from "../protoPost";
var Schema = mongoose.Schema;

interface protoPostModel extends protoPost, mongoose.Document {}

var postSchema = new mongoose.Schema({
  // poster      : { type: Schema.Types.ObjectId, ref: 'User'},
  fullname    : String,
  title       : String,
  description : String,
  tag         : [Number],
  location    : [Number],
  contact     : String,
  photo       : String,
  lost        : Boolean,
  createTime  : { type: Date, default: new Date() },
  modifiedTime: { type: Date, default: new Date() },
  complete    : { type: Boolean, default: 0 },
  // confirmer   : { type: Schema.Types.ObjectId, ref: 'User', default: null},
});

var Post = mongoose.model<protoPostModel>("Post", postSchema);

export = Post;
