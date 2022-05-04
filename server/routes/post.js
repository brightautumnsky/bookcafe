const router = require("express").Router();
const { Post } = require("../models/Post");
const { auth } = require("../middleware/auth");
const multer = require("multer");

// 업로드
router.post("/upload", auth, (req, res) => {
  const post = new Post(req.body);
  post.save((e) => {
    if (e) {
      return res.status(400).json({ success: false, e });
    }
    return res.status(200).json({ success: true });
  });
});

// 이미지
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
var upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (e) => {
    if (e) {
      return res.json({ success: false, e });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// 모든 글 가져오기
router.post("/getAllPost", (req, res) => {
  let searchTerm = req.body.searchTerm;
  if (searchTerm) {
    Post.find({ $text: { $search: searchTerm } })
      .populate("writer")
      .exec((e, allPost) => {
        if (e) {
          return res.status(400).json({ success: false, e });
        }
        res.status(200).json({ success: true, allPost });
      });
  } else {
    Post.find()
      .populate("writer")
      .exec((e, allPost) => {
        if (e) {
          return res.status(400).json({ success: false, e });
        }
        res.status(200).json({ success: true, allPost });
      });
  }
});

// 특정 글 가져오기
router.get("/get_by_id", (req, res) => {
  let type = req.query.type;
  let postIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    postIds = [];
    postIds = ids.map((item) => item);
  }

  Post.find({ _id: { $in: postIds } })
    .populate("writer")
    .exec((e, post) => {
      if (e) {
        return res.status(400).send(e);
      }
      return res.status(200).send(post);
    });
});

module.exports = router;
