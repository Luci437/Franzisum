import React, { useRef, useState } from "react";
import axios from "axios";
import { storage } from "../firebase/config";

const AdminEditPodcast = ({ match }) => {
  // all reference variables
  const podTitle = useRef();
  const podCoverImage = useRef();
  const podAudioFile = useRef();
  const podAuthor = useRef();
  const podDescripition = useRef();
  // all useState variables
  let newPodId = "";
  const [postVisibility, setPostVisibilty] = useState(true);
  const [dataUploading, setDataUploading] = useState(false);

  const uploadAudioFile = async () => {
    let audioFile = podAudioFile.current.files[0];
    let storageRef = storage
      .ref()
      .child(`podcast/${Date.now()}_${audioFile.name}`)
      .put(audioFile);
    storageRef.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          console.log(newPodId);
          await axios({
            method: "PATCH",
            url: "http://localhost:7000/admin/uploadAudio",
            data: {
              podId: newPodId,
              audioUrl: downloadURL,
            },
          })
            .catch((error) => {
              console.log(error);
            })
            .then((res) => {
              console.log(res.data.message);
              setDataUploading(false);
              window.location.href = "http://localhost:3000/admin/viewPodcast";
            });
        });
      }
    );
  };

  const podFormSubmit = async (e) => {
    e.preventDefault();
    setDataUploading(true);
    //getting image url from firebase
    let coverImage = podCoverImage.current.files[0];
    let storageRef = storage
      .ref()
      .child(`podcast/${Date.now()}_${coverImage.name}`)
      .put(coverImage);
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
            url: "http://localhost:7000/admin/addPodcast",
            data: {
              title: podTitle.current.value,
              coverImage: downloadURL,
              podAuthor: podAuthor.current.value,
              podDescription: podDescripition.current.value,
              visibilityPost: postVisibility,
            },
          })
            .catch((error) => {
              console.log(error);
            })
            .then((res) => {
              podTitle.current.value = "";
              podDescripition.current.value = "";
              podAuthor.current.value = "";

              newPodId = res.data.podId;
              uploadAudioFile();
            });
        });
      }
    );
  };

  return (
    <div className="AdminArticlesView_container">
      <p className="AdminAllContainer__TitleName">
        <i className="fas fa-microphone-alt"></i> Upload Podcast
      </p>
      <form onSubmit={podFormSubmit}>
        <div className="AdminArticleAdd_container">
          <div className="AdminArticle_SubBox">
            <label className="inputTitle">Podcast Title</label>
            <input type="text" ref={podTitle} className="InputBox" />
          </div>
          <div className="AdminArticle_SubBox">
            <label className="inputTitle">Description</label>
            <textarea
              ref={podDescripition}
              rows="5"
              className="InputBox"
            ></textarea>
          </div>
          <div className="optionalSubBox">
            <div className="AdminArticle_SubBox">
              <label className="inputTitle">Author's Name</label>
              <input ref={podAuthor} type="text" name="" className="InputBox" />
            </div>
            <div className="AdminArticle_SubBox">
              <label className="inputTitle">Upload Cover Image</label>
              <input
                type="file"
                name="podCoverImage"
                ref={podCoverImage}
                id="podCoverImage"
              />
              <label htmlFor="podCoverImage" className="uploadButton">
                <p>Image</p>
                <i className="fas fa-upload"></i>
              </label>
            </div>
            <div className="AdminArticle_SubBox">
              <label className="inputTitle">Upload Pod Audio</label>
              <input
                type="file"
                ref={podAudioFile}
                name="podAudio"
                id="podAudio"
              />
              <label htmlFor="podAudio" className="uploadButton">
                <p>Audio</p>
                <i className="fas fa-upload"></i>
              </label>
            </div>
            <div className="AdminArticle_SubBox">
              <label className="inputTitle">Change Visibility</label>
              <div className="radioBox">
                <input
                  type="radio"
                  value="public"
                  className="postVisibilityInput"
                  name="postVisibility"
                  id="publicView"
                />
                <label
                  onClick={() => setPostVisibilty(true)}
                  htmlFor="publicView"
                  className="postVisibilityLabel"
                >
                  <i className="fas fa-eye checkedCircle"></i>Public
                </label>
                <input
                  type="radio"
                  value="private"
                  className="postVisibilityInput"
                  name="postVisibility"
                  id="privateView"
                />
                <label
                  onClick={() => setPostVisibilty(false)}
                  htmlFor="privateView"
                  className="postVisibilityLabel"
                >
                  <i className="fas fa-lock checkedCircle"></i>Private
                </label>
              </div>
            </div>
          </div>
          <button className="finalUploadButton" type="submit">
            {dataUploading ? "Uploading" : "Save Changes and Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditPodcast;
