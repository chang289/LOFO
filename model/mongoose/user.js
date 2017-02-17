"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
<<<<<<< HEAD
    email: String,
    username: String,
    password: String,
    history: [String]
=======
    email: { type: String, unique: true },
    username: String,
    password: String,
>>>>>>> master
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=user.js.map