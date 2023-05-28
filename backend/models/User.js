const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    jwt_token: String,

    list: {
        type: Array
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;





