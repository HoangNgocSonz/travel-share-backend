const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      message: String,
    },
    { required: true },
  ],
  images: [
    {
      type: String,
    },
    { required: true },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
