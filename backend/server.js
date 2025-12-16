const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// A simple test endpoint to check if the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
