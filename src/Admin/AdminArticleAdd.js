import React, { useRef, useState } from "react";
import "./css/AdminArticleAdd.css";
import { storage } from "../firebase/config";
import axios from "axios";

const AdminArticleAdd = () => {
  const coverImage = useRef();
  const [iconName, setIconName] = useState("-upload");
  const [dataUploading, setDataUploading] = useState(false);
  const title = useRef();
  const description = useRef();
  const youtubeUrl = useRef();
  const [visibility, setVisibility] = useState(true);

  const isImageUploaded = () => {
    if (coverImage.current.value) {
      setIconName("-check-circle");
    }
  };

  const articleSubmit = async (e) => {
    e.preventDefault();
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
            url: "http://localhost:7000/admin/addArticle",
            data: {
              title: title.current.value,
              description: description.current.value,
              youtubeUrl: youtubeUrl.current.value,
              visibility: visibility,
              coverImage: downloadURL,
            },
          })
            .catch((error) => {
              console.log(error);
            })
            .then((res) => {
              title.current.value = "";
              description.current.value = "";
              youtubeUrl.current.value = "";
              console.log(res.data.message);
              window.location.href = "http://localhost:3000/admin/viewArticle";
            });
        });
      }
    );
  };

  return (
    <div className="AdminArticlesView_container">
      <p className="AdminAllContainer__TitleName">
        <i className="fas fa-pen-nib"></i> Post Article
      </p>
      <form onSubmit={articleSubmit}>
        <div className="AdminArticleAdd_container">
          <div className="AdminArticle_SubBox">
            <label className="inputTitle">Give a title</label>
            <input type="text" ref={title} className="InputBox" />
          </div>
          <div className="AdminArticle_SubBox">
            <label className="inputTitle">Main Content</label>
            <textarea
              rows="20"
              ref={description}
              className="InputBox articleDiscription"
            ></textarea>
          </div>

          <div className="AdminArticle_SubBox">
            <label className="inputTitle">Youtube Code</label>
            <input
              type="text"
              ref={youtubeUrl}
              className="InputBox"
              placeholder="eg:<iframe width=560 height=315 src=https://www.youtube.com....."
            />
          </div>
          <div className="optionalSubBox">
            <div className="AdminArticle_SubBox">
              <label className="inputTitle">Upload Cover Image</label>
              <input
                type="file"
                onChange={isImageUploaded}
                ref={coverImage}
                name="coverImage"
                id="articleCoverImage"
              />
              <label htmlFor="articleCoverImage" className="uploadButton">
                <p>Upload</p>
                <i className={"fas fa" + iconName}></i>
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
                  htmlFor="publicView"
                  onClick={() => setVisibility(true)}
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
                  htmlFor="privateView"
                  onClick={() => setVisibility(false)}
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

export default AdminArticleAdd;
