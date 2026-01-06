// backend/routes/driverRoutes.js
import express from 'express';
const router = express.Router();
import { getDriverDashboard, getDriverHistory } from '../controllers/driverController.js';

// In a real app, these routes would be protected and use req.user.id
router.get('/dashboard/:userId', getDriverDashboard);
router.get('/history/:userId', getDriverHistory);

export default router;
