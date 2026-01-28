import express from 'express';
import auth from '../../middleware/auth.js';
import { registerUser, loginUser } from '../../controllers/driver/userController.js';
import { getDriverDashboard, getDriverHistory } from '../../controllers/driver/driverController.js';
import { createDriverReservation } from '../../controllers/driver/reservationController.js';
import { getDriverNotifications, markNotificationRead, seedDriverNotifications } from '../../controllers/driver/notificationController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/dashboard/:userId', auth, getDriverDashboard);
router.get('/history/:userId', auth, getDriverHistory);
router.post('/reserve', auth, createDriverReservation);
router.get('/notifications/:userId', auth, getDriverNotifications);
router.patch('/notifications/:notificationId/read', auth, markNotificationRead);
router.post('/notifications/:userId/seed', auth, seedDriverNotifications);

export default router;
