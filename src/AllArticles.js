import React, { useState, useEffect } from "react";
import "./css/TopStories.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AllArticles = () => {
  //all state variable here
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticleList();
  }, []);

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
      });
  };
  return (
    <div className="allArticleContainer">
      {articles.map((article, index) => (
        <NavLink to={"/article/" + article._id} exact>
          <div className="story">
            <img
              src={article.articleCoverImage}
              alt=""
              className="storyImage1"
            />
            <div className="cover"></div>
            <div className="storyTitlesBox">
              <p className="storyMainTitle1">{article.articleTitle}</p>
              <p className="storyMainTitle2">
                Podcast<strong>.</strong>Youtube
              </p>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default AllArticles;
