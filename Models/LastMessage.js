const mongoose = require('mongoose');
const LastMessageSchema = mongoose.Schema({
    members: {
        type: [],
        required: true,
    },
    messages: {
        type: {},
        required: true,
    },

    hour: {
        type: Date,
        default: Date.now()
    },
    noReadMesgs: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('LastMessages', LastMessageSchema);