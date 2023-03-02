import React from "react";
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import Header from "./componets/Header"
import Home from "./pages/homePage/Home"



const App=() =>{
  return (
    <div className="App">
    <Header/>
      <Routes>
          <Route path="/" element={<Home />} />
       </Routes>
    </div>
  );
}

export default App;
