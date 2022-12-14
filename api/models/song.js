const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    songwriter: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Song", songSchema);