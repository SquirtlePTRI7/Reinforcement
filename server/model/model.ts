const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    applicationSubmissions: {
        type: Number,
        default: 0,
        required: true
    },
    interviews: {
        type: Number,
        default: 0,
        required: true
    },
    phoneScreens: {
        type: Number,
        default: 0,
        required: true
    },
    jobOffers: {
        type: Number,
        default: 0,
        required: true
    },
    currentScore: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model("Profile", profileSchema);
