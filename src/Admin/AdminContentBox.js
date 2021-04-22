import React from "react";
import AdminArticlesView from "./AdminArticlesView";
import AdminArticleAdd from "./AdminArticleAdd";
import AdminPodcastView from "./AdminPodcastView";
import AdminPodcastAdd from "./AdminPodcastAdd";
import AdminEditArticle from "./EditArticle";
import AdminEditPodcast from "./EditPodcast";
import { Route } from "react-router-dom";

const AdminContentBox = () => {
  return (
    <div className="adminContentBox_container">
      <Route path="/admin/viewArticle" component={AdminArticlesView} />
      <Route path="/admin/addArticle" component={AdminArticleAdd} />
      <Route path="/admin/viewPodcast" component={AdminPodcastView} />
      <Route path="/admin/addPodcast" component={AdminPodcastAdd} />
      <Route path="/admin/editArticle/:id" component={AdminEditArticle} />
      <Route path="/admin/editPodcast/:id" component={AdminEditPodcast} />
    </div>
  );
};

export default AdminContentBox;
