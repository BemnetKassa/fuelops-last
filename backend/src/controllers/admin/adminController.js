import bcrypt from 'bcryptjs';
import pool from '../../db/pg.js';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const result = await pool.query('SELECT * FROM "Admin" WHERE email = $1', [email]);
    const admin = result.rows[0];
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: 'ADMIN',
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};
