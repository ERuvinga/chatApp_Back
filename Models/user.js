
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    lastOnline: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", userSchema);