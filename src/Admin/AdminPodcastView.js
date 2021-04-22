import React, { useEffect, useState } from "react";
import { Images } from "../Images/Assests";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AdminPodcastView = () => {
  const [podDatas, setPodDatas] = useState([]);

  useEffect(() => {
    fetchPodData();
  }, []);

  const setDeletePodId = async (podId) => {
    await axios({
      method: "DELETE",
      url: "http://localhost:7000/admin/deletePodcast",
      data: {
        podId: podId,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log(res.data.message);
        setPodDatas(res.data.podDataReturn);
        if (podDatas.length === 0) {
          setPodDatas([]);
        }
      });
  };

  const fetchPodData = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:7000/admin/viewPodcast",
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setPodDatas(res.data.podDataReturn);
      });
  };

  return (
    <div className="AdminArticlesView_container">
      <p className="AdminAllContainer__TitleName">
        <i className="fas fa-microphone-alt"></i>Podcast
        <NavLink to="/admin/addPodcast">
          <p className="newPostLink">
            <i class="fas fa-plus-square"></i> Upload Pod
          </p>
        </NavLink>
      </p>
      <div className="viewGridContainer">
        {podDatas.map((podData, index) => (
          <div key={index} className="eachPods">
            <img src={podData.coverImage} alt="" className="transparentImage" />
            <img src={podData.coverImage} alt="" className="podCasset" />
            <div className="podDataParts">
              <p className="podCastAdminTitle">{podData.podTitle}</p>
              <p className="nowPlayingPodAuthor podCastAuthorAdmin">
                Podcast<strong>.</strong>
                {podData.podAuthor}
              </p>
            </div>
            <div className="cdPlayer">
              <p>{podData.podDuration}</p>
              <div className="rounder"></div>
            </div>
            <div className="editBox_option">
              <i class="fas fa-play"></i>
              <NavLink to={"/admin/editPodcast/" + podData._id}>
                <i className="fas fa-pencil-alt" title="Edit"></i>
              </NavLink>
              <i
                className="fas fa-trash-alt"
                title="Delete"
                onClick={() => setDeletePodId(podData._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPodcastView;
