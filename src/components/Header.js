import { Link } from 'react-router-dom';
import logo from './logo.png';

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

const logoStyle = {
  height: '40px',
  marginRight: '30px',
  display: 'flex',
  alignItems: 'center'
};

const navContainerStyle = {
  display: 'flex',
  alignItems: 'center'
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
      <Link to="/map" style={{ textDecoration: 'none' }}>
        <img 
          src={logo} 
          alt="Logo" 
          style={logoStyle}
        />
      </Link>
      
      <nav style={navContainerStyle}>
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
