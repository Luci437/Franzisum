import React, { useEffect, useState } from "react";
import "./css/AdminArticlesView.css";
import { Images } from "../Images/Assests";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AdminArticlesView = () => {
  const [articleDatas, setArticleDatas] = useState([]);

  useEffect(() => {
    fetchArticleData();
  }, []);

  const deleteArticle = async (articleId) => {
    await axios({
      method: "DELETE",
      url: "http://localhost:7000/admin/deleteArticle",
      data: {
        articleId: articleId,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log(res.data.message);
        setArticleDatas(res.data.ArticleDataReturn);
        if (articleDatas.length === 0) {
          setArticleDatas([]);
        }
      });
  };

  const fetchArticleData = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:7000/admin/viewArticle",
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setArticleDatas(res.data.ArticleDataReturn);
      });
  };

  return (
    <div className="AdminArticlesView_container">
      <p className="AdminAllContainer__TitleName">
        <i className="fas fa-pen-nib"></i>Articles
        <NavLink to="/admin/addArticle">
          <p className="newPostLink">
            <i class="fas fa-plus-square"></i> Add Post
          </p>
        </NavLink>
      </p>
      <div className="viewGridContainer">
        {articleDatas.map((articleData, index) => (
          <div key={index} className="story">
            <img
              src={articleData.articleCoverImage}
              alt=""
              className="storyImage1"
            />
            <div className="cover"></div>
            <div className="storyTitlesBox">
              <p className="storyMainTitle1">{articleData.articleTitle}</p>
              <p className="storyMainTitle2">
                Podcast<strong>.</strong>Youtube
              </p>
            </div>
            <div className="editBox_option">
              <NavLink to={"/admin/editArticle/" + articleData._id}>
                <i className="fas fa-pencil-alt" title="Edit"></i>
              </NavLink>
              <i
                className="fas fa-trash-alt"
                onClick={() => deleteArticle(articleData._id)}
                title="Delete"
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArticlesView;
