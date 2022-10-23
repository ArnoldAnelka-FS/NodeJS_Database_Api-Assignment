const mongoose = require("mongoose");

const songwriterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Songwriter", songwriterSchema);