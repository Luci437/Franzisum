import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./css/Menus.css";

const Menus = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="mainMenuBox">
      <div className={mobileMenu ? "mobileMenuBox" : "hideMobileMenu"}>
        <ul>
          <NavLink to="/" exact activeClassName="activeLink">
            <li className="menusLink2">Earth</li>
          </NavLink>
          <NavLink to="/allArticles" exact activeClassName="activeLink">
            <li className="menusLink2">Articles</li>
          </NavLink>
          <NavLink to="/podcast" exact activeClassName="activeLink">
            <li className="menusLink2">Podcast</li>
          </NavLink>
          <NavLink to="/videos" exact activeClassName="activeLink">
            <li className="menusLink2">Videos</li>
          </NavLink>
          <p>
            <i className="fab fa-ethereum"></i> franzisum
          </p>
        </ul>
        <p
          onClick={() => setMobileMenu(!mobileMenu)}
          className="mobileMenuBoxCloseButton"
        >
          <i className="fas fa-times"></i>
        </p>
      </div>
      <div
        onClick={() => setMobileMenu(!mobileMenu)}
        className="mobile_naveBarBox"
      >
        <i className="fas fa-bars"></i>
      </div>
      <div className="allMenuBox">
        <ul>
          <NavLink to="/" exact activeClassName="activeLink">
            <li className="menusLink">Earth</li>
          </NavLink>
          <NavLink to="/allArticles" exact activeClassName="activeLink">
            <li className="menusLink">Articles</li>
          </NavLink>
          <NavLink to="/podcast" exact activeClassName="activeLink">
            <li className="menusLink">Podcast</li>
          </NavLink>
          <NavLink to="/videos" exact activeClassName="activeLink">
            <li className="menusLink">Videos</li>
          </NavLink>
          <li className="menusLink">
            Store <span className="commingSoonText">Coming Soon</span>
          </li>
        </ul>
      </div>
      <div className="searchBox">
        <input
          type="text"
          name="search"
          placeholder="Search for Articles,Podcast..."
          className="siteSearchBox"
        />
        <i className="fas fa-search"></i>
      </div>
    </div>
  );
};

export default Menus;
