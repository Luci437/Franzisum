import React from "react";
import "./css/App.css";
import PUBLIC from "./PUBLIC";
import AdminIndex from "./Admin/AdminIndex";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route component={AdminIndex} path="/admin" />
          <Route component={PUBLIC} to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
