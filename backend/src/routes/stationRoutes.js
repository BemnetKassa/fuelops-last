// backend/routes/stationRoutes.js
import express from 'express';
const router = express.Router();
import { getStations } from '../controllers/stationController.js';

router.get('/', getStations);

export default router;
