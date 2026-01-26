import express from 'express';
import auth from '../../middleware/auth.js';
import { registerUser, loginUser } from '../../controllers/driver/userController.js';
import { getDriverDashboard, getDriverHistory } from '../../controllers/driver/driverController.js';
import { createDriverReservation } from '../../controllers/driver/reservationController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/dashboard/:userId', auth, getDriverDashboard);
router.get('/history/:userId', auth, getDriverHistory);
router.post('/reserve', auth, createDriverReservation);

export default router;
