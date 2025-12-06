import { Link } from 'react-router-dom';

const navStyle = {
  backgroundColor: '#ffffff', 
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  padding: '15px 40px', 
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky', 
  top: 0,
  zIndex: 100
};

const linkStyle = {
  color: '#333', 
  textDecoration: 'none', 
  margin: '0 15px', 
  fontWeight: '500', 
  fontSize: '16px',
  transition: 'color 0.3s',
};

const loginBtnStyle = {
  ...linkStyle,
  color: '#007bff', 
  border: '1px solid #007bff',
  padding: '8px 16px',
  borderRadius: '4px',
  marginLeft: '25px',
  fontWeight: '600',
};

function Header() {
  return (
    <header style={navStyle}>
      <nav>
        <Link to="/map" style={linkStyle}>Map</Link>
        <Link to="/alerts" style={linkStyle}>Alerts</Link>
        <Link to="/issues" style={linkStyle}>Issues</Link>
        <Link to="/file-a-complaint" style={linkStyle}>File a Complaint</Link>
      </nav>
      <div>
        <Link to="/login" style={loginBtnStyle}>Login</Link>
      </div>
    </header>
  );
}

export default Header;