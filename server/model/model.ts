const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  applicationSubmissions: {
    type: Number,
    default: 0,
  },
  interviews: {
    type: Number,
    default: 0,
  },
  phoneScreens: {
    type: Number,
    default: 0,
  },
  jobOffers: {
    type: Number,
    default: 0,
  },
  currentScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
