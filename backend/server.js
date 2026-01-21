import express from 'express';
import cors from 'cors';

import userRoutes from './src/routes/userRoutes.js';
import stationRoutes from './src/routes/stationRoutes.js';
import reservationRoutes from './src/routes/reservationRoutes.js';
import driverRoutes from './src/routes/driverRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import stationAdminRoutes from './src/routes/stationAdminRoutes.js';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stationadmin', stationAdminRoutes);

// A simple test endpoint to check if the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
