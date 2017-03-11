"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var tokenSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    initToken: { type: String },
});
var Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
//# sourceMappingURL=token.js.map