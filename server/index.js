const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8800;
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const bookmarkRoute = require("./routes/bookmark");
const commentRoute = require("./routes/comment");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/bookmark", bookmarkRoute);
app.use("/api/comment", commentRoute);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log("backend server is runnung..."));
