"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: String,
    password: String,
    initToken: { type: String, default: undefined },
    initialize: { type: Boolean, default: 0 },
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map