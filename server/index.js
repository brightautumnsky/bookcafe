const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8800;
const userRoute = require("./routes/users");
const bodyParser = require("body-parser");

const uri = require("./config/dev").MONGO_URL;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/users", userRoute);

app.listen(port, () => console.log("backend server is runnung..."));
