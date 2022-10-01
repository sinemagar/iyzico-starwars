import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "../pages/Details.js";

import Home from "../pages/Home";
function Routers() {
  return (
    <center>
      <Routes className="App">
        <Route exact path="/" element={<Home />} />
        <Route path="/starships/:id" element={<Details />} />
      </Routes>
    </center>
  );
}

export default Routers;
