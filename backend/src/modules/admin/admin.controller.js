import { loginAdmin } from './admin.service.js';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }

  try {
    const admin = await loginAdmin(email, password);

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    return res.json(admin);
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      message: 'Server error during admin login',
    });
  }
};