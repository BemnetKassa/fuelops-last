import express from 'express';
import auth from '../../middleware/auth.js';
import { registerUser, loginUser } from '../../controllers/driver/userController.js';
import { getDriverDashboard, getDriverHistory } from '../../controllers/driver/driverController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard/:userId', auth, getDriverDashboard);
router.get('/history/:userId', auth, getDriverHistory);

export default router;
