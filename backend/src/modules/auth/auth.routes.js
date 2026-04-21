import express from 'express';
import { loginUser, registerUser, updateUser } from './auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);

export default router;
