const router = require("express").Router();
const { Podcast } = require("../models/podcast");
const { articleModel } = require("../models/article");

router.post("/admin/addPodcast", async (req, res) => {
  const podTitles = req.body.title;
  const coverImage = req.body.coverImage;
  const podDescription = req.body.podDescription;
  const authorName = req.body.podAuthor;
  const visibility = req.body.visibilityPost;
  const podDuration = req.body.podDuration;
  const podData = new Podcast({
    podTitle: podTitles,
    podDescription: podDescription,
    podAuthor: authorName,
    visibility: visibility,
    coverImage: coverImage,
    audioUrl: "willBeAdded",
    podDuration: podDuration,
  });
  const dataSaved = await podData.save();
  res.status(200).json({ message: "Data collected", podId: dataSaved._id });
});

router.patch("/admin/uploadAudio", async (req, res) => {
  const podId = req.body.podId;
  const audioUrl = req.body.audioUrl;
  const dataUpdated = await Podcast.findByIdAndUpdate(
    { _id: podId },
    { audioUrl: audioUrl }
  );
  res.status(200).json({ message: "Audio file uploaded" });
});

router.get("/admin/viewPodcast", async (req, res) => {
  const podData = await Podcast.find();
  res.status(200).json({ podDataReturn: podData });
});

router.get("/admin/viewArticle", async (req, res) => {
  const articleData = await articleModel.find();
  res.status(200).json({ ArticleDataReturn: articleData });
});

router.delete("/admin/deletePodcast", async (req, res) => {
  const podId = req.body.podId;
  const podData = await Podcast.remove({ _id: podId });
  const allPodData = await Podcast.find();
  res
    .status(200)
    .json({ podDataReturn: allPodData, message: "Podcast Removed" });
});

router.delete("/admin/deleteArticle", async (req, res) => {
  const articleId = req.body.articleId;
  const podData = await articleModel.remove({ _id: articleId });
  const allArticleData = await articleModel.find();
  res
    .status(200)
    .json({ ArticleDataReturn: allArticleData, message: "Article Removed" });
});

//to get podcast list in homepage
router.get("/", async (req, res) => {
  let podData;
  let articleData;
  const limits = parseInt(req.headers.limit);
  if (req.headers.limit) {
    podData = await Podcast.find({ visibility: true }).limit(limits).sort("-1");
    articleData = await articleModel
      .find({ articleVisibility: true })
      .limit(limits)
      .sort("-1");
      
  } else {
    podData = await Podcast.find({ visibility: true });
    articleData = await articleModel.find({ articleVisibility: true });
  }
  res.status(200).json({ podData: podData, articleData: articleData });
});

router.get("/podcast", async (req, res) => {
  const podData = await Podcast.find({ visibility: true });
  res.status(200).json({ podData: podData });
});

router.post("/admin/addArticle", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const coverImage = req.body.coverImage;
  const visibility = req.body.visibility;
  const youtubeUrl = req.body.youtubeUrl;

  const articleData = new articleModel({
    articleTitle: title,
    articleDiscription: description,
    youtubeUrl: youtubeUrl,
    articleVisibility: visibility,
    articleCoverImage: coverImage,
  });

  const savedData = await articleData.save();
  res.status(200).json({ message: "Article Added", Data: savedData });
});

router.get("/article/:id", async (req, res) => {
  const postId = req.params.id;
  const articleData = await articleModel.findById({ _id: postId });
  res.status(200).json({ article: articleData });
});

router.get("/podcast/:id", async (req, res) => {
  const podId = req.params.id;
  const podcastData = await Podcast.findById({ _id: podId });
  res.status(200).json({ podcast: podcastData });
});

router.post("/admin/editPodcast/editCoverImage/:id", async (req, res) => {
  const postId = req.params.id;
  const coverImage = req.body.coverImage;
  const articleData = await Podcast.findByIdAndUpdate(
    { _id: postId },
    { coverImage: coverImage }
  );
  res.status(200).json({ article: articleData });
});

router.post("/admin/editPodcast/editAudio/:id", async (req, res) => {
  const postId = req.params.id;
  const audioUrl = req.body.audioUrl;
  const articleData = await Podcast.findByIdAndUpdate(
    { _id: postId },
    { audioUrl: audioUrl }
  );
  res.status(200).json({ article: articleData });
});

router.post("/admin/editArticle/editVisibility/:id", async (req, res) => {
  const postId = req.params.id;
  const visibility = req.body.visibility;
  const articleData = await articleModel.findByIdAndUpdate({_id: postId},{articleVisibility: visibility});
  res.status(200).json({ article: articleData });
});

router.post("/admin/editArticle/editCoverImage/:id", async (req, res) => {
  const postId = req.params.id;
  const coverImage = req.body.coverImage;
  const articleData = await articleModel.findByIdAndUpdate({_id: postId},{articleCoverImage: coverImage});
  res.status(200).json({ article: articleData });
});

router.post("/admin/editArticle/editArticleTitle/:id", async (req, res) => {
  const postId = req.params.id;
  const articleTitle = req.body.articleTitle;
  const articleData = await articleModel.findByIdAndUpdate({_id: postId},{articleTitle: articleTitle});
  res.status(200).json({ article: articleData });
});

router.post("/admin/editArticle/editArticleDesc/:id", async (req, res) => {
  const postId = req.params.id;
  const articleDesc = req.body.articleDesc;
  const articleData = await articleModel.findByIdAndUpdate({_id: postId},{articleDiscription: articleDesc});
  res.status(200).json({ article: articleData });
});

router.post("/admin/editArticle/editArticleUrl/:id", async (req, res) => {
  const postId = req.params.id;
  const articleUrl = req.body.articleUrl;
  const articleData = await articleModel.findByIdAndUpdate({_id: postId},{youtubeUrl: articleUrl});
  res.status(200).json({ article: articleData });
});

module.exports = router;
