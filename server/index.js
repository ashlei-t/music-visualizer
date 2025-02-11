/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';


const port = 5001;

dotenv.config(); // Load environment variables from .env file

// Fetch Spotify credentials from environment variables
const spotify_client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;

const app = express();
app.use(cors());

// Function to generate a random string of a given length
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Endpoint to initiate Spotify authorization
app.get('/auth/login', (req, res) => {
  const scope = "streaming user-read-email user-read-private"; // Corrected scope formatting
  const state = generateRandomString(16);
  console.log("state: ",state);

  // Directly from tutorial Request User Authorization
  const auth_query_parameters = new URLSearchParams({
    response_type: "code", // this will always be code
    client_id: spotify_client_id, // client id from our application dotenv file
    scope: scope, // the permissions we are asking for
    redirect_uri: `http://localhost:${port}/auth/callback`,
    grant_type: 'authorization_code',
    state: state // a random string for security
  });

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

// Callback endpoint to handle Spotify authentication response
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code; // Authorization code from Spotify

  if (!code) {
    // code is no bueno send an error message
    console.log('code:', code);
    return res.status(400).send("Authorization code not found");
  }

  try {
    // Prepare the request to Spotify's token endpoint
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        code: code,
        redirect_uri: `http://localhost:${port}/auth/callback`,
        grant_type: 'authorization_code'
      }).toString()
    };


    // Make a POST request to Spotify's token endpoint
    const response = await axios(authOptions);
    const access_token = response.data.access_token;


    // Redirect to home page (you may want to store the token securely)
    res.redirect('/');
  } catch (error) {
    console.error("Error fetching access token:", error.response ? error.response.data : error.message);
    res.status(500).send("Error retrieving access token");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
