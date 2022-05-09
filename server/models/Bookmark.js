const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: String,
    },
    postTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

module.exports = { Bookmark };
