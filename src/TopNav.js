import React, { useState, useEffect } from "react";
import "./css/TopNav.css";
import { GoogleLogin } from "react-google-login";

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID;

const TopNav = () => {
  const [userImageUrl, setUserImageUrl] = useState("");
  const [usernameFromGoogleLogin, setUsernameFromGoogleLogin] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showSignBox, setShowSignBox] = useState(false);
  const responseGoogle = (response) => {
    setUserImageUrl(response.profileObj.imageUrl);
    setUsernameFromGoogleLogin(response.profileObj.name);
    setUserLoggedIn(true);
    localStorage.setItem("userId", response.tokenId);
    localStorage.setItem("userName", response.profileObj.name);
    localStorage.setItem("profileImage", response.profileObj.imageUrl);
    setShowSignBox(!showSignBox);
  };

  useEffect(() => {
    const Logged = localStorage.getItem("userId");
    if (Logged) {
      setUserLoggedIn(true);
      setUserImageUrl(localStorage.getItem("profileImage"));
      setUsernameFromGoogleLogin(localStorage.getItem("userName"));
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  return (
    <div className="NavMainBox">
      <p className="projectTitle">
        <i className="fab fa-ethereum"></i> franzisum
      </p>
      <div className="profileBox">
        {userLoggedIn ? (
          <>
            <span className="notificationIcons">
              <i className="fas fa-shopping-cart"></i>
              <span></span>
            </span>
            <span className="notificationIcons">
              <i className="fas fa-bell"></i>
              <span></span>
            </span>
            <img className="defaultProPic" alt="userImage" src={userImageUrl} />
            <p>{usernameFromGoogleLogin}</p>
          </>
        ) : (
          <>
            <button
              className="signUpButton"
              onClick={() => setShowSignBox(!showSignBox)}
            >
              Sign up
            </button>
          </>
        )}
        <div className={showSignBox ? "signInMainBox" : "hideSignInMainBox"}>
          <h4>Sing In</h4>
          <GoogleLogin
            clientId={clientId}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
