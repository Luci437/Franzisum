import React, { useEffect, useState } from "react";
import "./css/singlePost.css";
import { Images } from "./Images/Assests";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import axios from "axios";

const SinglePost = ({ match }) => {
  const [postData, setPostData] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlePost();
    fetchArticleList();
  }, []);

  const fetchArticlePost = async () => {
    const postId = match.params.id;
    console.log(postId);
    await axios({
      method: "GET",
      url: `http://localhost:7000/article/${postId}`,
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setPostData(res.data.article);
      });
  };

  const fetchArticleList = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:7000/",
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setArticles(res.data.articleData);
        console.log(articles);
      });
  };

  return (
    <div className="article__mainContainer">
      <div className="article__imageBox">
        <img src={postData.articleCoverImage} alt="" />
        <div className="article__shareBox">
          <FacebookShareButton
            url={"http://localhost:3000/article/" + postData._id}
            quote={"Franzisum - " + postData.articleTitle}
            hashtag="#Franzisum"
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={"http://localhost:3000/article/" + postData._id}
            quote={"Franzisum - " + postData.articleTitle}
            hashtag="#Franzisum"
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={"http://localhost:3000/article/" + postData._id}
            quote={"Franzisum - " + postData.articleTitle}
            hashtag="#Franzisum"
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton
            url={"http://localhost:3000/article/" + postData._id}
            quote={"Franzisum - " + postData.articleTitle}
            hashtag="#Franzisum"
          >
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </div>
      </div>
      <h2 className="article__articleTitle">{postData.articleTitle}</h2>
      <div className="article__YoutubeBox">
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + postData.youtubeUrl}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p className="article_content">{postData.articleDiscription}</p>
      <div className="suggestedArticle_box">
        {/* <div className="suggestBox_each">
          <img src={articles[0].articleCoverImage} alt="" />
          <p>{articles[0].articleTitle}</p>
        </div>
        <div className="suggestBox_each">
          <img src={articles[1].articleCoverImage} alt="" />
          <p>{articles[1].articleTitle}</p>
        </div>
        <div className="suggestBox_each">
          <img src={articles[2].articleCoverImage} alt="" />
          <p>{articles[2].articleTitle}</p>
        </div> */}
      </div>
    </div>
  );
};

export default SinglePost;
