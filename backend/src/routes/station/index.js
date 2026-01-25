import express from 'express';
import auth from '../../middleware/auth.js';
import { stationAdminLogin } from '../../controllers/station/stationAdminController.js';
import { getStations } from '../../controllers/station/stationController.js';
import { createReservation } from '../../controllers/station/reservationController.js';

const router = express.Router();

router.post('/login', stationAdminLogin);
router.get('/', auth, getStations);
router.post('/reservations/create', auth, createReservation);

export default router;
