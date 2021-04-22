const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  articleTitle: {
    type: String,
    required: true,
  },
  articleDiscription: {
    type: String,
    required: true,
  },
  youtubeUrl: {
    type: String,
    default: '',
  },
  articleVisibility: {
    type: Boolean,
    required: true,
    default: true,
  },
  articleCoverImage: {
    type: String,
    required: true,
  },
});

const articleSchemas = mongoose.model("Article", articleSchema);
module.exports = { articleModel: articleSchemas };
