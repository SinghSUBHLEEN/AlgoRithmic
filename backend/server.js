const express = require("express");
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require("cookie-parser");

const mongoose = require("mongoose");
const connect = require("./config/connect");
const problemRoutes = require("./routes/problemRoutes");
const User = require('./models/User');
const e = require("express");
connect();
app.use(express.json());
app.use(cookie());
app.use("/api", problemRoutes);


const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const connect = require("./config/connect");
const problemRoutes = require("./routes/problemRoutes");
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");

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
app.listen(5000, () => {
  console.log("Listening at port 5000");
});
// const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
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
              const options = {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
                // maximum date upto which it will usrvive is 2 days from now
              };
              if (!val)
                res.status(400).json({ error: "Wrong password" });
              else {
                User.updateOne({ _id: data._id }, { token: token }, (err, data) => {
                  if (err)
                    res.status(501);
                  else {
                    res.status(201).cookie("token", { jwt_token: token }, {
                      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
                    }).json({ message: "Logged in", error: "", token: token });
                  }

                })
              }

            }
          });
        }
      }
    });
  }
});

app.post('/api/register', (req, res) => {
  const { fname, lname, email, password, confirm_password } = req.body;
  if (password == confirm_password) {
    User.findOne({ email: email }, (err, data) => {
      if (err)
        res.status(500).send("Something went wrong");
      else {
        console.log(data);
        if (data) {
          res.status(200).send("Email already taken");
        }
        else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err)
              res.status(200).send("Something went wrong");
            else {
              User.create({ email: email, fname: fname, lname: lname, password: hash }, (err, data) => {
                if (err)
                  res.status(501).send("Cannot create user right now, please try again later");
                else {
                  data.token = jwt.sign({ _id: data._id }, process.env.token_secret_key);
                  res.status(201).send("User created");
                }
              });
            }
          })
        }
      }
    })
  }
});

app.post("/api/verify", (req, res) => {
  console.log(req.cookies);
  if (!req.cookies) res.status(400).json({ flag: false });
  else res.status(201).json({ flag: true });
})
