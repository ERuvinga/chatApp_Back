const mongoose = require('mongoose');
const convesationShema = mongoose.Schema({
    members: {
        type: [],
        required: true,
    },

    messages: {
        type: [{}],
        required: true,

    }

});

module.exports = mongoose.model("conversation", convesationShema);