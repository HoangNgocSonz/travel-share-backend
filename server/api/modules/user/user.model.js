const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
  avatar: String,
  email: { type: String, unique: true },
  username: { type: String, required: true, minlength: 5, unique: true },
  password: { type: String, required: true, minlength: 5 },
  age: Number,
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);
