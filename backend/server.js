import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import adminRoutes from './src/routes/admin/index.js';
import driverRoutes from './src/routes/driver/index.js';
import stationRoutes from './src/routes/station/index.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/station', stationRoutes);
app.use('/api/users', userRoutes);
// Backward compatibility: station admin login previously under /api/stationadmin
app.use('/api/stationadmin', stationRoutes);

// A simple test endpoint to check if the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
