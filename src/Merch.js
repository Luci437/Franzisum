import React from "react";
import "./css/Merch.css";
import { Images } from "./Images/Assests";

const Merch = () => {
  return (
    <div className="mainMerchBox">
      <img src={Images.merch} alt="" className="oneMerchImage" />
      <div className="merchInfoBox">
        <p className="merchMainTitle">
          Brand New <strong>Classic</strong> Merchs
        </p>
        <button className="shopNowButton">
          <i className="fas fa-shopping-cart"></i> Coming_Soon
        </button>
      </div>
    </div>
  );
};

export default Merch;
