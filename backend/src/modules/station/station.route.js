import express from 'express';
import auth from '../../middleware/auth.js';
import { createReservation, getStations, stationAdminLogin } from './station.controller.js';

const router = express.Router();

router.post('/login', stationAdminLogin);
router.get('/', auth, getStations);
router.post('/reservations/create', auth, createReservation);

export default router;
