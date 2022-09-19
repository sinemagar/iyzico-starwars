import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "../pages/Details.js";
//maybe navlink
//pages

import Home from "../pages/Home";
function Routers() {
  return (
    <div>
      <nav></nav>

      <Routes className="App">
        <Route exact path="/" element={<Home />} />
        <Route path="/starships/:name" element={<Details />} />
      </Routes>
    </div>
  );
}

export default Routers;
