import express from 'express';
import { stationAdminLogin } from '../controllers/stationAdminController.js';

const router = express.Router();

// Station admin login route
router.post('/login', stationAdminLogin);

export default router;
