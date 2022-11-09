/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/footer";
import Home from "./components/home";
import Header from "./components/header";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <Router>
      < Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
      </Routes>
      < Footer />
    </Router>
  )
}

export default App
