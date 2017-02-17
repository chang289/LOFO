import * as mongoose from "mongoose";
import {protoUser} from "../protoUser";
var Schema = mongoose.Schema;

interface protoUserModel extends protoUser, mongoose.Document {}

var userSchema = new mongoose.Schema({
<<<<<<< HEAD
  email       : String,
  username    : String,
  password    : String,
  history     : [String]
=======
  email       : { type: String, unique: true },
  username    : String,
  password    : String,
>>>>>>> master
});

var User = mongoose.model<protoUserModel>("User", userSchema);

export = User;
