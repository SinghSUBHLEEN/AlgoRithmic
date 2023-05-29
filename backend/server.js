const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require("cookie-parser");
const connect = require("./config/connect");
const problemRoutes = require("./routes/problemRoutes");
connect();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const checkRoutes = require("./routes/createChecks");
const User = require("./models/User");
const { Router } = require("express");
const router = Router();

app.use(express.json());
app.use(cookie());
app.use("/api", problemRoutes);
app.use("/api", userRoutes);
app.use("/api", listRoutes);
app.use("/api", checkRoutes);
app.listen(5000, () => {
  console.log("Listening at port 5000");
});
// const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/login', (req, res) => {
  const { email, password, rem } = req.body;
  if (!email && !password) {
    res.status(400).json({ error: "Please enter the email and password" });
  }
  else if (!email) {
    res.status(400).json({ error: "Please enter the email" });
  }
  else if (!password) {
    res.status(400).json({ error: "Please enter the password" });
  }
  else {
    const arr = User.findOne({ email: email }, (err, data) => {
      if (err) {
        res.send(501).json({ error: "Something went wrong" });
      }
      else {
        if (!data) {
          res.status(400).json({ error: "No such user" });
        }
        else {
          bcrypt.compare(password, data.password, (err, val) => {
            if (err) {
              res.status(501).json({ error: "Something went wrong" });
            }
            else {
              const token = jwt.sign({ _id: data._id }, process.env.token_secret_key);
              if (!val)
                res.status(400).json({ error: "Wrong password" });
              else {
                let options;
                if (rem === 'on') {
                  options = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
                }
                res.status(201).cookie("token", token, options).json({ _id: data._id, message: "Logged in", error: "", token: token });
              }

            }
          });
        }
      }
    });
  }
});

app.post('/api/register', (req, res) => {
  console.log(req.body);
  const { fname, lname, email, password, confirm_password, rem } = req.body;
  if (!email || !password || !fname || !lname || !confirm_password) {
    res.status(400).json({ error: "Please fill all the feilds" });
  }
  if (password !== confirm_password)
    res.status(400).json({ error: "Password does not match" });
  User.findOne({ email: email }, (err, data) => {
    if (err)
      res.status(501).json({ error: "Something went wrong" });
    else {
      console.log(data);
      if (data) {
        res.status(400).json({ error: "User already exists" });
      }
      else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err)
            res.status(501).json({ error: "Something went wrong" });
          else {
            User.create({ email: email, fname: fname, lname: lname, password: hash }, (err, data) => {
              if (err)
                res.status(501).json({ error: "Cannot create user right now, please try again later" });
              else {
                const token = jwt.sign({ _id: data._id }, process.env.token_secret_key);
                let options;
                if (rem === 'on') {
                  options = { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) };
                }
                res.status(201).cookie("token", token, options).json({ _id: data._id, message: "Logged in", error: "", token: token });
              }
            });
          }
        })
      }
    }
  })
});

app.post("/api/verify", (req, res) => {
  console.log(req.cookies);
  const cook = req.cookies.token;
  const _id = jwt.verify(token, process.env.token_secret_key);
  User.findOne({ _id: _id, }, (err, data) => {
    if (err)
      res.status(501);
    else {
      if (data)
        res.status(201);
      else
        res.status(400);
    }
  });
})
