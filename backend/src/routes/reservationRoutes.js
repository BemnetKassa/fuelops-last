
import express from 'express';
import auth from '../middleware/auth.js';
import { createReservation } from '../controllers/reservationController.js';

const router = express.Router();

// Protected reservation route
router.post('/create', auth, createReservation);

export default router;
