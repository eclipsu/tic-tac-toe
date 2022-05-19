import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const RootRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="*" />
      </Routes>
    </Router>
  );
};

export default RootRouter;
