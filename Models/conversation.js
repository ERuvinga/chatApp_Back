const mongoose = require('mongoose');
const convesationShema = mongoose.Schema({
    members: {
        type: Object,
        required: true,
    },

    messages: {
        type: Object,
        required: true,
    }
});

module.exports = mongoose.model("conversation", convesationShema);