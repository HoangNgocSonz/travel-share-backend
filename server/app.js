require("dotenv").config();
const express = require("express");
const config = require("./config");
var bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const postRouter = require("./api/modules/post/post.router");
const userRouter = require("./api/modules/user/user.router");

mongoose
  .connect(config.mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to database"))
  .catch(() => console.log("Error connecting to database"));
const PORT = process.env.PORT || 6969;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Bad JSON request" });
  }
});

app.use("/", express.static("../client"));
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app.listen(PORT, function () {
  console.log(`Server is listening on ${PORT}`);
});
