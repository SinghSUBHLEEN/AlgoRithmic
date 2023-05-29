const mongoose = require("mongoose");
module.exports = () => {
  const uri =
    "mongodb+srv://" +
    process.env.DB_username +
    ":" +
    process.env.DB_pass +
    "@cluster0.aazupnn.mongodb.net/?retryWrites=true&w=majority";
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("Connected to MongoDB"));
};
