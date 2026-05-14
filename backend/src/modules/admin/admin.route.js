import express from 'express';
import auth from '../../middleware/auth.js';
import { adminLogin, getReportById, getReports, updateReportStatus, getProfileAdmin, getDrivers, getStations } from './admin.controller.js';

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

// Admin-only dashboard
router.get('/dashboard', auth, (req, res) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  res.json({ message: 'Welcome to the admin dashboard!' });
});

router.get('/reports', auth, getReports);
router.get('/reports/:id', auth, getReportById);
router.patch('/reports/:id/status', auth, updateReportStatus);
router.get('/profile', auth, getProfileAdmin);
router.get('/users', auth, getDrivers);
router.get('/stations', auth, getStations);

export default router;