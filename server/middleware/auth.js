const { User } = require("../models/Users");

// 인증 처리
let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  User.findByToken(token, (e, user) => {
    if (e) {
      throw e;
    }
    if (!user) {
      return res.json({ isAuth: false, e: true });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
