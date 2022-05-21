import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Game from "./App/Pages/Game";

const RootRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Without ID */}
        <Route exact path="/" element={<Game />} />
        {/* With ID, Multiplayer */}
        <Route exact path="/:id" element={<Game />} />
        <Route exact path="/404" element={<h2> 404 </h2>} />
        <Route exact path="*" />
      </Routes>
    </Router>
  );
};

export default RootRouter;
