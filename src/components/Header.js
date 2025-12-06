import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ 
      backgroundColor: '#333', 
      padding: '10px 20px', 
      display: 'flex', 
      justifyContent: 'space-between' 
    }}>
      <nav>
        <Link to="/map" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Map</Link>
        <Link to="/alerts" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Alerts</Link>
        <Link to="/issues" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Issues</Link>
        <Link to="/file-a-complaint" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>File a Complaint</Link>
      </nav>
      <div>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', backgroundColor: '#007bff', borderRadius: '4px' }}>Login</Link>
      </div>
    </header>
  );
}

export default Header;