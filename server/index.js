const express = require("express");
const cors = require("cors");
const userRouter = require('./router/user.router');
const ConnectionDatabase = require("./db/connect.db");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

ConnectionDatabase()

app.use('/api',userRouter)


app.listen(3001, () => {
  console.log("server is running");
});
