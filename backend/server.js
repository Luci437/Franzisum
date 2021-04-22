const express = require("express");
const app = express();
const route = require("./router/allRouter");
const cors = require("cors");
const parser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  console.log("Connected to Database")
);

app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", route);

app.listen(7000, () => console.log("Server Running"));
