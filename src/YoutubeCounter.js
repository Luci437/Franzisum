import React, { useState, useEffect } from "react";
import config from "./YoutubeConfig";
import numeral from "numeral";
import "./css/subCount.css";

const YoutubeCounter = () => {
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    const { api_key, channel_id } = config;
    const apiCall = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channel_id}&key=${api_key}`;
    const response = await fetch(apiCall);
    const data = await response.json();
    const count = numeral(data.items[0].statistics.subscriberCount).format(
      "0,0"
    );
    setSubCount(count);
  };

  return (
    <div className="subCounterBox">
      <p className="totalSubCount">
        franzisum have <span>{subCount}</span> followers on{" "}
        <i className="fab fa-youtube"></i>
      </p>
    </div>
  );
};

export default YoutubeCounter;
