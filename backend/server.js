const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const connect = require("./config/connect");
const problemRoutes = require("./routes/problemRoutes");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const checkRoutes = require("./routes/createChecks");
const User = require("./models/User");
const { Router } = require("express");
const router = Router();

connect();
app.use(express.json());
app.get(["/"], (req, res) => {
  res.send("Connected");
});
app.use("/api", problemRoutes);
app.use("/api", userRoutes);
app.use("/api", listRoutes);
app.use("/api", checkRoutes);
app.listen(5000, () => {
  console.log("Listening at port 5000");
});
// const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loginFunction = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const arr = await User.findOne({ email: email, password: password });

  if (arr) {
    res.json({
      _id: arr._id,
      list: arr.list,
    });
  } else {
    res.status(200).send("no such user found");
  }
};

app.post("/api/login", loginFunction);

app.post("/api/register", (req, res) => {
  const { fname, lname, email, password, confirm_password } = req.body;
  console.log(req.body);
  if (password === confirm_password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) console.log(err);
      else {
        User.find({ email: email }, (err, data) => {
          if (err) res.status(501).send("Something went wrong");
          else {
            if (data.length != 0) {
              res.status(200).send("Account already exists with same email");
            } else {
              User.create(
                {
                  fname: fname,
                  lname: lname,
                  email: email,
                  password: password,
                },
                (err, data) => {
                  if (err) {
                    console.log(err);
                    res.status(404).send("Something went wrong");
                  } else {
                    res.status(201).send("User Created");
                  }
                }
              );
            }
          }
        });
      }
    });
  } else {
    res.send("Check the password");
  }
});
