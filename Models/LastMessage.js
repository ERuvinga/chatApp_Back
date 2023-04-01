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
    }
})

module.exports = mongoose.model('LastMessages', LastMessageSchema);