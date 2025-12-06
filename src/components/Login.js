import React from 'react';

function Login() {
  return (
    <section style={{ padding: '20px' }}>
      <h2> Login</h2>
      <form>
        <input type="email" placeholder="Email" required style={{ display: 'block', margin: '10px 0' }} />
        <input type="password" placeholder="Password" required style={{ display: 'block', margin: '10px 0' }} />
        <button type="submit">Log In</button>
      </form>
    </section>
  );
}

export default Login;