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
  )
}

export default App;
