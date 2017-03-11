import * as mongoose from "mongoose";
import {protoToken} from "../protoToken";
var Schema = mongoose.Schema;

interface protoTokenModel extends protoToken, mongoose.Document {}

var tokenSchema = new mongoose.Schema({
  email       : { type: String, unique: true },
  initToken   : { type: String },
});

var Token = mongoose.model<protoTokenModel>("Token", tokenSchema);

export = Token;
