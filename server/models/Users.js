const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config/key");
const secretToken = config.SECRET_TOKEN;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (e, salt) {
      if (e) {
        return next(e);
      }
      bcrypt.hash(user.password, salt, function (e, hash) {
        if (e) {
          return next(e);
        }
        // 암호화된 비밀번호 hash
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (e, isMatch) {
    if (e) {
      return cb(e);
    }
    return cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), secretToken);
  user.token = token;
  user.save(function (e, user) {
    if (e) {
      return cb(e);
    }
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  // 디코드
  jwt.verify(token, secretToken, function (e, userId) {
    user.findOne({ _id: userId, token: token }, function (e, user) {
      if (e) {
        return cb(e);
      }
      return cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
