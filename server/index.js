import express from 'express'
import dotenv from 'dotenv'

const port = 5001

dotenv.config()

const spotify_client_id = process.env.VITE_SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET

const app = express();

app.get('/auth/login', (req, res) => {
});

app.get('/auth/callback', (req, res) => {
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
