const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
  },
  writer: {
    type: String,
    minlength: 1,
  },
  date: {
    type: String,
    minlength: 1,
  },
  content: {
    type: String,
    minlength: 1,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
