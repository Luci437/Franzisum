import React, {useRef, useState} from "react";
import {Images} from '../Images/Assests';

const AdminLogin = () => {

    const passRef = useRef();
    const [errorLog, setErrorLog] = useState(false);

    const checkAuth = (e) => {
        e.preventDefault();
        if(passRef.current.value === '9213') {
            localStorage.setItem('isLogged', true);
            window.location.href = "http://localhost:3000/admin/viewArticle";
            setErrorLog(false);
        }else {
            passRef.current.value = "";
            setErrorLog(true);
        }
    }

  return <div className="AdminLoginContainer">
      <img src={Images.adminBg} alt="" className="bgImage"/>
      <p>Authentication Required</p>
      <form onSubmit={checkAuth}>
        <input type="password" ref={passRef} className="AdminInputBox" placeholder="Admin Password"/>
      </form>
      {errorLog ? (<><small className="errorLog">Authentication Failed</small></>) : (
          <></>
      )}
      
      <span className="siteLogo"><i className="fab fa-ethereum"></i> franzisum</span>
  </div>;
};

export default AdminLogin;
