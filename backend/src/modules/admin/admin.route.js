import express from 'express';
import auth from '../../middleware/auth.js';
import { adminLogin } from './admin.controller.js';

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

export default router;