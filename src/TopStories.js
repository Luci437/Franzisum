import React, { useState, useEffect } from "react";
import "./css/TopStories.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const TopStories = () => {
  //all state variable here
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticleList();
  }, []);

  const fetchArticleList = async () => {
    await axios({
      method: "GET",
      headers: {
        limit: 4,
      },
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
    <div className="topStoriesMainBox">
      <p>Top Articles</p>
      <NavLink to="/allArticles" activeClassName="activeLink">
        <p className="seemoreStories">See more {">>"}</p>
      </NavLink>
      <div className="eachStoresBox">
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
              <div className="newBadge">New</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TopStories;
