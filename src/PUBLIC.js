import React from "react";
import Slider from "./Slider";
import NavBar from "./TopNav";
import Menus from "./Menus";
import TopStories from "./TopStories";
import AllPods from "./AllPods.js";
import YoutubeCount from "./YoutubeCounter";
import SinglePost from "./SinglePost";
import Videos from "./Videos";
import PodcastList from "./PodcastList";
import AllArticles from "./AllArticles";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const PUBLIC = () => {
  return (
    <div className="appPUBLIC">
      <NavBar />
      <Menus />
      <Route component={Slider} path="/" exact />
      <Route component={YoutubeCount} path="/" exact />
      <Route component={TopStories} path="/" exact />
      <Route component={AllPods} path="/" exact />
      <Route component={SinglePost} path="/article/:id" exact />
      <Route component={Videos} path="/videos" />
      <Route component={PodcastList} path="/podcast" exact />
      <Route component={AllArticles} path="/allArticles" exact />
    </div>
  );
};

export default PUBLIC;
