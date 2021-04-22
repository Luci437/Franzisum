import React, { useEffect, useState } from "react";
import "./css/videos.css";
import config from "./YoutubeConfig";
import ReactTimeAgo from "react-time-ago";

const Videos = () => {
  const maxLengthDes = 60;
  const { api_key, channel_id } = config;
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const maxResult = 8;
  const [itemLoaded, setItemLoaded] = useState(true);

  useEffect(() => {
    const fetchYoutubeVideo = async () => {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel_id}&key=${api_key}&order=date&maxResults=${maxResult}`
      );

      const data = await response.json();
      setYoutubeVideos(data.items);
      await truncateText();
      await setItemLoaded(false);
    };
    fetchYoutubeVideo();
  }, []);

  // this is used to truncate the text
  const truncateText = () => {
    let elements = document.querySelectorAll(".videos__videoTitle");
    let word = "";

    elements.forEach((element, index) => {
      word = element.innerHTML;
      if (word.length > maxLengthDes) {
        word = word.substr(0, maxLengthDes) + "...";
      }
      elements[index].innerHTML = word;
    });
  };

  return (
    <div className="videos__mainContainer">
      {itemLoaded ? (
        <>
          <div className="videos__videosPreLoader"></div>
        </>
      ) : (
        <>
          {youtubeVideos.map((video, i) => (
            <a
              href={"https://www.youtube.com/watch?v=" + video.id.videoId}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              <div className="videos__eachContainer">
                <div className="videos__thumbnailBox">
                  <img src={video.snippet.thumbnails.medium.url} alt="" />
                </div>
                <div className="videos__dataPart">
                  <p className="videos__videoTitle">{video.snippet.title}</p>
                  <p className="videos_videoViewCount">
                    <i className="fas fa-clock"></i>{" "}
                    <ReactTimeAgo
                      date={video.snippet.publishTime}
                      locale="en-UN"
                    />
                  </p>
                </div>
              </div>
            </a>
          ))}
        </>
      )}
    </div>
  );
};

export default Videos;
