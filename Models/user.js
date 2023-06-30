
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
        required: true
    },
    picture: {
        type: String,
        default: ''
    },

    compteCreated:{
        type:Date,
        default: Date.now
    },

    lastOnline: {
        type: Date,
        default: Date.now
    },

    status: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("user", userSchema);