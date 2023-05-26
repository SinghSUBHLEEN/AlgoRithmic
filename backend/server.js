const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = express();
const mongoose = require("mongoose");
const connect = require("./config/connect");
const problemRoutes = require("./routes/problemRoutes");
const User = require("./models/User");
connect();
app.use(express.json());
app.get(["/"], (req, res) => {
  res.send("Connected");
});
app.use("/api", problemRoutes);
app.listen(5000, () => {
  console.log("Listening at port 5000");
});
// const app = express();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const loginFunction = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const arr = await User.findOne({ email: email, password: password });
  if (arr.length === 0) res.status(200).send("No such user");
  else {
    res.json({
      _id: arr._id,
    });
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
                { fname: fname, lname: lname, email: email, password: hash },
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
