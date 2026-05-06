import express from 'express';
import auth from '../../middleware/auth.js';
import {
	createDriverReservation,
	createDriverReport,
	getDriverDashboard,
	getDriverHistory,
	getDriverNotifications,
	getDriverReports,
	loginUser,
	markNotificationRead,
	registerUser,
	seedDriverNotifications,
} from './driver.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/dashboard/:userId', auth, getDriverDashboard);
router.get('/history/:userId', auth, getDriverHistory);
router.post('/reserve', auth, createDriverReservation);
router.post('/reports', auth, createDriverReport);
router.get('/reports', auth, getDriverReports);
router.get('/notifications/:userId', auth, getDriverNotifications);
router.patch('/notifications/:notificationId/read', auth, markNotificationRead);
router.post('/notifications/:userId/seed', auth, seedDriverNotifications);

export default router;
