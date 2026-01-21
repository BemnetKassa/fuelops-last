// backend/routes/stationRoutes.js

import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();
import { getStations } from '../controllers/stationController.js';

// Protected station route
router.get('/', auth, getStations);

export default router;
