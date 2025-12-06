// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Map from './components/Map';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Map />} /> 
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;