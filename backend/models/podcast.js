const mongoose = require("mongoose");

const podCastSchema = new mongoose.Schema({
  podTitle: {
    type: String,
    required: true,
  },
  podDescription: {
    type: String,
    required: true,
  },
  podAuthor: {
    type: String,
    required: true,
  },
  podDuration: {
    type: String,
    required: true,
    default: '0:00'
  },
  coverImage: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    required: true,
    default: true,
  },
  dataOfCreation: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const podSchema = mongoose.model("Podcast", podCastSchema);
module.exports = { Podcast: podSchema };
