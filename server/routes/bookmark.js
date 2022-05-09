const express = require("express");
const router = express.Router();
const { Bookmark } = require("../models/Bookmark");

// 북마크 숫자 가져오기
router.post("/bookmarkNumber", (req, res) => {
  Bookmark.find({ postId: req.body.postId }).exec((e, info) => {
    if (e) return res.status(400).send(e);
    res.status(200).json({ success: true, bookmarkNumber: info.length });
  });
});

// 북마크 여부 파악
router.post("/bookmarked", (req, res) => {
  Bookmark.find({
    postId: req.body.postId,
    userFrom: req.body.userFrom,
  }).exec((e, info) => {
    if (e) {
      return res.status(400).send(e);
    }

    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, bookmarked: result });
  });
});

// 북마크 가져오기
router.post("/getAll", (req, res) => {
  Bookmark.find({
    userFrom: req.body.userFrom,
  }).exec((e, bookmarkList) => {
    if (e) {
      return res.status(400).send(e);
    }
    res.status(200).json({ success: true, bookmarkList });
  });
});

// 북마크 추가
router.post("/add", (req, res) => {
  const bookmark = new Bookmark(req.body);
  bookmark.save((e, result) => {
    if (e) {
      return res.status(400).send(e);
    }
    res.status(200).json({ success: true, result });
  });
});

// 북마크 삭제
router.post("/delete", (req, res) => {
  Bookmark.findOneAndDelete({
    postId: req.body.postId,
    userFrom: req.body.userFrom,
  }).exec((e, result) => {
    if (e) {
      return res.status(400).send(e);
    }
    res.status(200).json({ success: true, result });
  });
});

module.exports = router;
