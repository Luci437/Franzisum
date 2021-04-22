import React, { useState, useRef, useEffect } from "react";
import "./css/PodcastList.css";
import { Images } from "./Images/Assests";
import axios from "axios";
import Welcome from "./Podcast/welcome.mp3";

let changeIndex = 0;

const PodcastList = () => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioTag = useRef();
  const audioDuration = useRef();
  const currentDuration = useRef();
  const trackRef = useRef();
  const speakerRef = useRef();
  const [currentTrackName, setCurrentTrackName] = useState("Loading");
  const [currentTrackAuthor, setcurrentTrackAuthor] = useState("Loading");
  const [currentTrackCover, setCurrentTrackCover] = useState(
    Images.songDefault
  );
  const [currentPodCast, setCurrentPodcast] = useState(Welcome);
  const [allPodcast, setAllPodcast] = useState([]);
  const [finalData, setFinalData] = useState([]);
  let rAF = null;
  const filterText = useRef();

  useEffect(() => {
    fetchPodcast();
  }, []);

  const fetchPodcast = async () => {
    await axios({
      method: "GET",
      url: "http://localhost:7000/podcast",
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setAllPodcast(res.data.podData);
        setFinalData(res.data.podData);
      });
  };

  const playAudio = () => {
    console.log(audioPlaying);
    if (!audioPlaying) {
      audioTag.current.play();
      console.log("Playing");
      setAudioPlaying(true);
      requestAnimationFrame(whilePlaying);
    } else {
      audioTag.current.pause();
      console.log("Paused");
      setAudioPlaying(false);
      cancelAnimationFrame(rAF);
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    try {
      trackRef.current.value = Math.floor(audioTag.current.currentTime);
      currentDuration.current.textContent = calculateTime(
        trackRef.current.value
      );
      trackRef.current.style.setProperty(
        "--seek-before-width",
        `${(trackRef.current.value / trackRef.current.max) * 100}%`
      );
      rAF = requestAnimationFrame(whilePlaying);
    } catch (error) {}
  };

  const displayDuration = () => {
    audioDuration.current.textContent = calculateTime(
      audioTag.current.duration
    );
  };

  const previousSong = () => {
    setAudioPlaying(false);
    console.log(changeIndex);
    changeIndex -= 1;
    if (changeIndex === -1) {
      changeIndex = allPodcast.length - 1;
    }
    setTimeout(() => {
      console.log(changeIndex);
      getPodUrl(allPodcast[changeIndex], changeIndex);
    }, 1000);
  };

  const nextSong = () => {
    setAudioPlaying(false);
    changeIndex += 1;
    if (changeIndex === allPodcast.length) {
      changeIndex = 0;
      console.log("returned");
    }
    setTimeout(() => {
      console.log(changeIndex);
      getPodUrl(allPodcast[changeIndex], changeIndex);
    }, 1000);
  };

  const setSliderMax = () => {
    trackRef.current.max = Math.floor(audioTag.current.duration);
  };

  const trackDrag = () => {
    audioTag.current.currentTime = trackRef.current.value;
    if (!audioTag.current.paused) {
      requestAnimationFrame(whilePlaying);
    }
  };

  const updateAudio = () => {
    trackRef.current.value = Math.floor(audioTag.current.currentTime);
  };

  const metadataLoaded = () => {
    if (audioTag.current.readyState > 0) {
      displayDuration();
      setSliderMax();
      speakerRef.current.style.setProperty(
        "--seek-before-width",
        `${(speakerRef.current.value / speakerRef.current.max) * 100}%`
      );
    }
  };

  const slideTrack = () => {
    currentDuration.current.textContent = calculateTime(trackRef.current.value);
    if (!audioTag.current.paused) {
      cancelAnimationFrame(rAF);
    }
  };

  const changeVolume = () => {
    speakerRef.current.style.setProperty(
      "--seek-before-width",
      `${(speakerRef.current.value / speakerRef.current.max) * 100}%`
    );
    audioTag.current.volume = speakerRef.current.value / 100;
  };

  const getPodUrl = (audioObj, index) => {
    changeIndex = index;
    setCurrentPodcast(audioObj.audioUrl);
    setCurrentTrackName(audioObj.podTitle);
    setcurrentTrackAuthor(audioObj.podAuthor);
    setCurrentTrackCover(audioObj.coverImage);
    audioTag.current.load();
    setTimeout(() => {
      metadataLoaded();
      setAudioPlaying(!audioPlaying);
      console.log(audioTag.current.play());
      audioTag.current.play();
      setAudioPlaying(true);
    }, 1000);
  };

  let filteredResult = [];

  const filterPod = async (e) => {
    let searchText = e.target.value;
    filteredResult = allPodcast.filter(pod => pod.podTitle.toLowerCase().includes(searchText.toLowerCase()));
    setFinalData(filteredResult);
    console.log(filteredResult);
  };

  return (
    <div className="PodcastList__mainContainer">
      <div className="PodcastList__ImageBannerBox">
        <div className="PodcastList__ImageBannerNavBox">
          <i className="fas fa-angle-left"></i>
          <p>NOW PLAYING</p>
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <div className="ImageBannerDataPart">
          <img src={currentTrackCover} alt="" />
          <p>{currentTrackName}</p>
          <p>{currentTrackAuthor}</p>
        </div>
      </div>
      <div className="PodcastList__podDataBox">
        <div className="podDataBox__filterTopBox">
          <p>BROWSE MORE</p>
          <div className="podDataBox__filterBox">
            <input
              type="text"
              name="filter_podcast"
              placeholder="Filter Podcast"
              ref={filterText}
              onKeyUp={filterPod}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div className="podDataBox__allPodDataList">
          <ul>
            <div className="allPodDataList__eachPodBox podMainTitles">
              <p></p>
              <p>#</p>
              <p>TRACK</p>
              <p>ARTIST</p>
              <p>DURATION</p>
            </div>
            {finalData.map((podcast, index) => (
              <li key={index} onClick={() => getPodUrl(podcast, index)}>
                <div className="allPodDataList__eachPodBox">
                  <div className="eachPodPlayButtonBox">
                    <i className="fas fa-play-circle"></i>
                  </div>
                  <div className="eachPodSerial">
                    <p>#{index + 1}</p>
                  </div>
                  <div className="eachPodTitleBox">
                    <p>{podcast.podTitle}</p>
                  </div>
                  <div className="eachPodPodcasterName">
                    <p>{podcast.podAuthor}</p>
                  </div>
                  <div className="eachPodDuration">
                    <p>{podcast.podDuration}</p>
                  </div>
                </div>
              </li>
            ))}
            <div className="dummyBox"></div>
          </ul>
        </div>
      </div>
      <div className="PodcastList__PlayerControlBox">
        <div className="PlayerControlBox_infoBox">
          <img className="currentPodcastImage" src={currentTrackCover} alt="" />
          <span>
            <p className="currentPodcastTitle">{currentTrackName}</p>
            <p className="currentPodcastAuthor">{currentTrackAuthor}</p>
          </span>
        </div>
        <div className="playerControlBox__controlBox">
          <i
            onClick={previousSong}
            class="fas fa-step-backward secondaryIcons"
          ></i>
          <i
            className={
              audioPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"
            }
            id="podPlayButton"
            onClick={playAudio}
          ></i>
          <i onClick={nextSong} class="fas fa-step-forward secondaryIcons"></i>
          <p className="podCurrent" ref={currentDuration}>
            0:00
          </p>
          <input
            type="range"
            onChange={trackDrag}
            value="0"
            ref={trackRef}
            onInput={slideTrack}
            id="playRange"
            max="100"
          />
          <p className="podTotalPlayTime" ref={audioDuration}>
            0:00
          </p>
          <span>
            <i className="fas fa-volume-down"></i>
            <input
              type="range"
              ref={speakerRef}
              onInput={changeVolume}
              id="volumeRange"
              max="100"
            />
          </span>
        </div>
        <audio
          src={currentPodCast}
          onEnded={nextSong}
          onTimeUpdate={updateAudio}
          onLoadedMetadata={metadataLoaded}
          ref={audioTag}
          id="audioPlayer"
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default PodcastList;
