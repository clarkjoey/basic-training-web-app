const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// ===== API ROUTES =====
app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'demo-token-123' });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/api/table-data', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', role: 'Engineer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Carol', role: 'Manager' },
  ]);
});

app.get('/api/dashboard', (req, res) => {
  res.send('<h1>Welcome to the Dashboard</h1><p>Overview of your app</p>');
});

app.get('/api/other-page', (req, res) => {
  res.send('<h1>Other Page</h1><p>This is another page in the app.</p>');
});

app.get('/api/chat-messages', (req, res) => {
  res.json([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
    { sender: 'user', text: 'What does this app do?' },
    { sender: 'bot', text: 'It simulates a simple frontend/backend integration for Replicate training.' },
  ]);
});

// ===== STATIC FRONTEND =====
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// Serve index.html only if the request is not an API route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});