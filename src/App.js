<<<<<<< HEAD:naksha/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './components/Header';
import Map from './components/Map';
import Alerts from './components/Alert';
import Issues from './components/Issues'; 
import FileComplaint from './components/FileComplaint'; 
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
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/issues" element={<Issues />} /> 
            <Route path="/file-a-complaint" element={<FileComplaint />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <p>work</p>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    </div>
>>>>>>> parent of 595f171 (Components initialized):src/App.js
  );
}

export default App;
