const express = require("express");
const { User } = require("../models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");

// 회원가입
router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((e, userInfo) => {
    if (e) {
      return res.json({ success: false, e });
    }
    return res.status(200).json({ success: true });
  });
});

// 로그인
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (e, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다.",
      });
    }
    user.comparePassword(req.body.password, (e, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "해당하는 유저가 없습니다.",
        });
      }
      // 토큰 생성
      user.generateToken((e, user) => {
        if (e) {
          return res.status(400).send(e);
        }
        // 토큰을 쿠키에 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// 로그아웃
router.get("/logout", auth, (req, res) => {
  // auth 미들웨어의 user
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (e, user) => {
    if (e) {
      return res.json({ success: false, e });
    }
    return res.status(200).send({ success: true });
  });
});

// 인증
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    image: req.user.image,
  });
});

module.exports = router;
