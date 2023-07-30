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
        type: [],
        required: true
    }
})

module.exports = mongoose.model('LastMessages', LastMessageSchema);