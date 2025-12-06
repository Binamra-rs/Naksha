import React from 'react';

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '20px',
};

const cardStyle = {
  width: '100%',
  maxWidth: '400px',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  margin: '10px 0',
  border: '1px solid #ced4da',
  borderRadius: '6px',
  boxSizing: 'border-box',
  fontSize: '16px',
  transition: 'border-color 0.3s',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s',
};


function Login() {
  return (
    <div style={formContainerStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '28px', color: '#343a40', marginBottom: '30px' }}>Secure Login</h2>
        
        <form>
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            style={inputStyle}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;