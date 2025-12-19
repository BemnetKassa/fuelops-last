import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import stationRoutes from './routes/stationRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import driverRoutes from './routes/driverRoutes.js';

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

// A simple test endpoint to check if the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
