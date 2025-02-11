import { useState, useEffect } from 'react';
import WebPlayback from './components/WebPlayback';
import Login from './components/Login';
import './App.css';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token'); // You may need to adjust the backend route
      const json = await response.json();
      setToken(json.access_token); // Save the token to state
    }

    getToken(); // Fetch the token when the app loads
  }, []);

  return (
    <>
      {token === '' ? <Login /> : <WebPlayback token={token} />}
    </>
  );
}

export default App;
