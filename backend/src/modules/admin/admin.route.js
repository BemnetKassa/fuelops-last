import express from 'express';
import auth from '../middleware/auth.js';
import { adminLogin } from '../controllers/adminController.js';
import { requireRole } from '../middleware/role.js';

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

// Admin-only dashboard
router.get('/dashboard', auth, requireRole('ADMIN'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;