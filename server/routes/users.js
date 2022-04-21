const express = require("express");
const { User } = require("../models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((e, userInfo) => {
    if (e) {
      return res.json({ success: false, e });
    }
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
