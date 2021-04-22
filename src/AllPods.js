import React, { useEffect, useState } from "react";
import "./css/AllPods.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AllPods = () => {
  //all state variable here
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    fetchPodcastList();
  }, []);

  const fetchPodcastList = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:7000/",
      headers: {
        limit: 4,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setPodcasts(res.data.podData);
      });
  };

  return (
    <div className="AllPodsMainBox">
      <p>Podcast</p>
      <NavLink to="/podcast" activeClassName="activeLink">
        <p className="seemoreStories">See more {">>"}</p>
      </NavLink>
      <div className="allPostsMain">
        {podcasts.map((podcast, index) => (
          <NavLink to="/podcast">
            <div key={index} className="eachPods">
              <img
                src={podcast.coverImage}
                alt=""
                className="transparentImage"
              />
              <img src={podcast.coverImage} alt="" className="podCasset" />
              <div className="podDataParts">
                <p>{podcast.podTitle}</p>
                <p className="nowPlayingPodAuthor">
                  Podcast<strong>.</strong>
                  {podcast.podAuthor}
                </p>
              </div>
              <div className="cdPlayer">
                <p>{podcast.podDuration}</p>
                <div className="rounder"></div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AllPods;
