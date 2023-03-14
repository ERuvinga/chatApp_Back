const mongoose = require('mongoose');
const convesationShema = mongoose.Schema({
    members: {
        type: Object,
        required: true,
    },

    messages: {
        type: {
            message: {
                type: String,
                required: true
            },
            Hour: {
                type: Date,
                default: Date.now
            }
        },
        required: true,
    }
});

module.exports = mongoose.model("conversation", convesationShema);