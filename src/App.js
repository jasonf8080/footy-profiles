import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "./components";
import Teams from "./pages/Teams";
import Team from "./pages/Team";
import Player from "./pages/Player";


// const Teams = lazy(() => import("./pages/Teams")); // Update the path to your Teams component
// const Team = lazy(() => import("./pages/Team")); // Update the path to your Team component
// const Player = lazy(() => import("./pages/Player")); // Update the path to your Player component



function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
       
          <Route path="/" element={<Teams/>}/>
          <Route path="/team/:idTeam" element={<Team/>}/>
          <Route path="/player/:idPlayer" element={<Player/>}/>
      
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
