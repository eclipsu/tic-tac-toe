import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./App/Pages/Home";

const RootRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" />
      </Routes>
    </Router>
  );
};

export default RootRouter;
