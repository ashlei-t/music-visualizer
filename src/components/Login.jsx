import React, { useEffect } from 'react';

function Login() {
  useEffect(() => {
    // You may want to redirect users to your /auth/login route here
    // The backend will handle the Spotify OAuth flow
    window.location.href = 'http://localhost:5001/auth/login';
  }, []);

  return (
    <div>
      <h2>Login with Spotify</h2>
    </div>
  );
}

export default Login;
