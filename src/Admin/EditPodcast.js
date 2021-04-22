import React, { useState, useEffect, useRef } from "react";
import "./css/editArticle.css";
import { Images } from "../Images/Assests";
import axios from "axios";
import { storage } from "../firebase/config";

let visi;

const EditPodcast = ({ match }) => {
  const [visibility, setVisibility] = useState(true);
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [podcasts, setpodcasts] = useState([]);
  const [postUrl, setPostUrl] = useState("");
  const coverImage = useRef();
  const audioUrl = useRef();
  const visiRef = useRef("");

  const styleToggle = {
    transform: "translateX(30px)",
  };
  const styleToggle2 = {
    transform: "translateX(0px)",
  };

  useEffect( () => {
     fetchArticleData();
     checkPostVisibility();
     checkPostTitle();
     checkPostDesc();
     checkPostUrl();
  }, []);

  const fetchArticleData = async () => {
    let podcastId = match.params.id;
    await axios({
      url: `http://localhost:7000/podcast/${podcastId}`,
      method: "GET",
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setpodcasts(res.data.podcast);
      });
  };

  const checkPostVisibility = () => {
    visi = visiRef.current.value;
    console.log("--->", visi);
    if (visi) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };

  const changeArticleVisibility = async () => {
    await setVisibility(!visibility);
    let articleId = match.params.id;
    let dataToSend;
    if (visibility) {
      dataToSend = false;
    } else {
      dataToSend = true;
    }
    await axios({
      url: `http://localhost:7000/admin/editArticle/editVisibility/${articleId}`,
      method: "POST",
      data: {
        visibility: dataToSend,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        fetchArticleData();
        showMessage("Article Visibilty Changed");
      });
  };

  const changeArticleCoverImage = (e) => {
    e.preventDefault();
    let articleId = match.params.id;
    let coverImages = coverImage.current.files[0];
    let storageRef = storage
      .ref()
      .child(`podcast/${Date.now()}_${coverImages.name}`)
      .put(coverImages);
    storageRef.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          await axios({
            method: "POST",
            url: `http://localhost:7000/admin/editPodcast/editCoverImage/${articleId}`,
            data: {
              coverImage: downloadURL,
            },
          })
            .catch((error) => {
              console.log(error);
            })
            .then((res) => {
              fetchArticleData();
              showMessage("Cover Image Saved");
            });
        });
      }
    );
  };

  const updateTitleInput = (e) => {
    setPostTitle(e.target.value);
  };

  const checkPostTitle = () => {
    setPostTitle(podcasts.podTitle);
  };

  const changeArticleTitle = async () => {
    let articleId = match.params.id;
    let articleTitle = postTitle;
    await axios({
      url: `http://localhost:7000/admin/editArticle/editArticleTitle/${articleId}`,
      method: "POST",
      data: {
        articleTitle: articleTitle,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        fetchArticleData();
        showMessage("Article Title Changed");
      });
  };

  const checkPostDesc = () => {
    setPostDesc(podcasts.articleDiscription);
  };

  const updateDescInput = (e) => {
    setPostDesc(e.target.value);
  };

  const changeArticleDesc = async () => {
    let articleId = match.params.id;
    let articleDesc = postDesc;
    await axios({
      url: `http://localhost:7000/admin/editArticle/editArticleDesc/${articleId}`,
      method: "POST",
      data: {
        articleDesc: articleDesc,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        fetchArticleData();
        showMessage("Article Description Changed");
      });
  };

  const checkPostUrl = () => {
    setPostUrl(podcasts.youtubeUrl);
  };

  const updateUrlInput = (e) => {
    setPostUrl(e.target.value);
  };

  const changeArticleUrl = async () => {
    let articleId = match.params.id;
    let articleUrl = postUrl;
    await axios({
      url: `http://localhost:7000/admin/editArticle/editArticlUrl/${articleId}`,
      method: "POST",
      data: {
        articleUrl: articleUrl,
      },
    })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        fetchArticleData();
        showMessage("Article Youtube Url Changed");
      });
  };

  const changePodcastAudioUrl = (e) => {
    e.preventDefault();
    let podId = match.params.id;
    let coverImages = audioUrl.current.files[0];
    let storageRef = storage
      .ref()
      .child(`podcast/${Date.now()}_${coverImages.name}`)
      .put(coverImages);
    storageRef.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          await axios({
            method: "POST",
            url: `http://localhost:7000/admin/editPodcast/editAudio/${podId}`,
            data: {
              audioUrl: downloadURL,
            },
          })
            .catch((error) => {
              console.log(error);
            })
            .then((res) => {
              fetchArticleData();
              showMessage("Podcast Updated Saved");
            });
        });
      }
    );
  }

  const showMessage = (text) => {
    let el1 = document.getElementsByClassName("updateStatusText")[0];
    let el2 = document.getElementById("statusText");
    el2.innerHTML = text;
    el1.style.display = "flex";

    setTimeout(() => {
      el1.style.display = "none";
    }, 6000);
  };

  return (
    <>
      <div className="editArticleImageBox">
        <input
          type="hidden"
          ref={visiRef}
          required
          value={podcasts.articleVisibility}
          className="InputBox"
        />
        <img src={podcasts.coverImage} className="articleImage" alt="" />
        <div className="publicPrivateBox">
          <div
            onClick={changeArticleVisibility}
            className="acessPointer"
            style={visibility ? styleToggle : styleToggle2}
          ></div>
          <div className="accessPointerIcon">
            <i class="fas fa-lock"></i>
            <i class="fas fa-lock-open"></i>
          </div>
        </div>
        <audio src={podcasts.audioUrl} controls className="podcastEditPlayer"></audio>
        <input
          id="imageInput"
          ref={coverImage}
          type="file"
          onChange={changeArticleCoverImage}
        />
        <label
          id="imageLabel"
          className="editArticleImageButton"
          htmlFor="imageInput"
        >
          <i class="fas fa-camera"></i>
        </label>

        <input
          id="audioinput"
          ref={audioUrl}
          type="file"
          onChange={changePodcastAudioUrl}
        />
        <label
          id="audioLabel"
          className="editPostImageButton"
          htmlFor="audioinput"
        >
          <i class="fas fa-compact-disc"></i>
        </label>
      </div>
      <div className="editWindow">
        <div className="subEditBox">
          <p className="editTitle">Change Article's Title</p>
          <span></span>
          <input
            type="text"
            required
            value={postTitle || podcasts.podTitle}
            onChange={updateTitleInput}
            className="InputBox"
          />
          <button onClick={changeArticleTitle} class="editUpdateButton">
            <i class="fas fa-cloud-upload-alt"></i> SAVE
          </button>
        </div>
        <div className="subEditBox">
          <p className="editTitle">Change Article Description</p>
          <span></span>
          <textarea
            rows="5"
            value={postDesc || podcasts.podDescription}
            onChange={updateDescInput}
            type="text"
            required
            className="textInputBox"
          ></textarea>
          <button onClick={changeArticleDesc} class="editUpdateButton">
            <i class="fas fa-cloud-upload-alt"></i> SAVE
          </button>
        </div>
      </div>
      <div id="statusBar" className="updateStatusText">
        <i class="fas fa-check-circle"></i>
        <p id="statusText">Title Update</p>
      </div>
    </>
  );
};

export default EditPodcast;
