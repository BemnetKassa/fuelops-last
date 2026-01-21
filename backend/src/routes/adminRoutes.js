
import express from 'express';
import auth from '../middleware/auth.js';
import { adminLogin } from '../controllers/adminController.js';
const router = express.Router();
// Admin login route
router.post('/login', adminLogin);

// Example protected admin route
router.get('/dashboard', auth, (req, res) => {
  // Only allow if user is admin
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;