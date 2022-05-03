import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import Info from "./pages/Info";
import Layout from "./layout/index";
import "./index.css"

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Layout><Home /></Layout>} />
     <Route path="/about" element={<Layout><About /></Layout>} />
     <Route path="/info" element={<Layout><Info /></Layout>} />
     {/* <Route path="make" element={<Layout><Make /></Layout>} />
     <Route path="contents01" element={<Contents01 />} /> */}
   </Routes>
  </BrowserRouter>
  );
}

export default App;
