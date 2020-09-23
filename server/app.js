const express = require('express');
const config = require("./config");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const postRouter = require('./api/modules/post/post.router');
const userRouter = require('./api/modules/user/user.router');

mongoose.connect(config.mongoConnectionString);
const PORT =process.env.PORT || 6969;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('../client'));
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

app.listen(PORT, function() {
  console.log(`Server is listening on ${PORT}`);
});

