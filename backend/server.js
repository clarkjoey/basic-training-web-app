// server.js (Express Backend)
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// Simulated Auth
app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'demo-token-123' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Table Data
app.get('/api/table-data', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', role: 'Engineer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Carol', role: 'Manager' }
  ]);
});

// Dashboard HTML content
app.get('/api/dashboard', (req, res) => {
  res.send('<h1>Welcome to the Dashboard</h1><p>Overview of your app</p>');
});

// Other Page Content
app.get('/api/other-page', (req, res) => {
  res.send('<h1>Other Page</h1><p>This is another page in the app.</p>');
});

// Fake AI Live Chat
app.get('/api/chat-messages', (req, res) => {
  res.json([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
    { sender: 'user', text: 'What does this app do?' },
    { sender: 'bot', text: 'It simulates a simple frontend/backend integration for Replicate training.' }
  ]);
});

app.listen(3001, () => console.log('API Server running on http://localhost:3001'));

// React frontend would run on port 3000 and call the above endpoints