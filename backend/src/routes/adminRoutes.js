import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

// Example protected admin route
router.get('/dashboard', auth, (req, res) => {
  // Only allow if user is admin
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;