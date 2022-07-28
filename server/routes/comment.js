const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

// 코멘트 추가
router.post("/save", (req, res) => {
  const comment = new Comment(req.body);
  comment.save((e, comment) => {
    if (e) {
      return res.json({ success: false, e });
    }
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((e, result) => {
        if (e) {
          return res.json({ success: false, e });
        }
        res.status(200).json({ success: true, result });
      });
  });
});

// 코멘트 가져오기
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("writer")
    .exec((e, comments) => {
      if (e) {
        return res.status(400).send(e);
      }
      res.status(200).json({ success: true, comments });
    });
});

// // 코멘트 삭제하기
// router.post("/delete", (req, res) => {
//   Comment.findOneAndDelete({ _id: req.body.commentId }).exec((e, result) => {
//     if (e) {
//       return res.status(400).send(e);
//     }
//     res.status(200).json({ success: true, comments });
//   });
// });

module.exports = router;
