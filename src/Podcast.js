import React, { useState, useRef, useEffect } from "react";
import "./css/Podcast.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Podcast = () => {
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
        limit: 1,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setPodcasts(res.data.podData);
        console.log(podcasts);
      });
  };

  const [podPlaying, playPod] = useState(false);
  const audioPlayer = useRef(null);

  const playAudio = () => {
    if (podPlaying) {
      audioPlayer.current.pause();
      playPod(!podPlaying);
    } else {
      audioPlayer.current.play();
      playPod(!podPlaying);
    }
  };

  return (
    <div className="mainPodcastBox">
      {podcasts.map((podcast, index) => (
        <>
          <div key={index} className="podMainTitle">
            <button className="playPodButton" onClick={playAudio}>
              <i className={podPlaying ? "fas fa-pause" : "fas fa-play"}></i>
            </button>
          </div>

          <div className="podDataPart">
            <div
              className={
                podPlaying ? "PodPosterBox runPodDisk" : "PodPosterBox"
              }
              style={{ background: `url("${podcast.coverImage}")`, backgroundSize: 'cover', backgroundPosition: 'center', }}
            ></div>
            <div className="podInfo">
              <p className="NowPlayingPodTitle">{podcast.podTitle}</p>
              <p className="nowPlayingPodAuthor">
                Podcast<strong>.</strong>
                {podcast.podAuthor}
              </p>
            </div>
            <div className="browseMorePod" title="Browse more">
              <NavLink to="/podcast">
                <p>Browse more</p>
              </NavLink>
            </div>
          </div>
          <audio
            ref={audioPlayer}
            id="pod_audio"
            src={podcast.audioUrl}
            type="audio/mp"
          ></audio>
        </>
      ))}
    </div>
  );
};

export default Podcast;
