// backend/routes/driverRoutes.js

import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();
import { getDriverDashboard, getDriverHistory } from '../controllers/driverController.js';

// Protected driver routes
router.get('/dashboard/:userId', auth, getDriverDashboard);
router.get('/history/:userId', auth, getDriverHistory);

export default router;
