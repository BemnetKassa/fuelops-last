import express from 'express';
import auth from '../../middleware/auth.js';
import { adminLogin } from '../../controllers/admin/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);

router.get('/dashboard', auth, (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;
