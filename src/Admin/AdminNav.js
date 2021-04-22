import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  const logoutAdmin = () => {
    localStorage.removeItem("isLogged");
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className="adminNav_container">
      <p className="adminPageTitle"> Dashboard</p>
      <div className="adminNav_menuBox">
        <ul>
          <NavLink to="/admin/viewArticle" activeClassName="activeNavLink">
            <li className="adminNav_menus">
              <i className="fas fa-pen-nib navIconSelected"></i> Articles
            </li>
          </NavLink>
          <NavLink to="/admin/viewPodcast" activeClassName="activeNavLink">
            <li className="adminNav_menus">
              <i className="fas fa-microphone-alt navIconSelected"></i> Podcast
            </li>
          </NavLink>
          <li className="adminNav_menus">
            <i className="fas fa-hat-cowboy-side navIconSelected"></i> Merch
            <p className="comingSoonAdmin">Coming Soon</p>
          </li>
        </ul>
      </div>
      <p className="logoutButton" onClick={logoutAdmin}>
        <i class="fas fa-sign-out-alt"></i>Go Earth
      </p>
    </div>
  );
};

export default AdminNav;
