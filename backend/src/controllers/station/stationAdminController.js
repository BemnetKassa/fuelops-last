import bcrypt from 'bcryptjs';
import pool from '../../db/pg.js';

export const stationAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const result = await pool.query('SELECT * FROM "StationAdmin" WHERE email = $1', [email]);
    const stationAdmin = result.rows[0];
    if (stationAdmin && (await bcrypt.compare(password, stationAdmin.password))) {
      res.json({
        id: stationAdmin.id,
        name: stationAdmin.name,
        email: stationAdmin.email,
        phone: stationAdmin.phone,
        stationId: stationAdmin.stationId,
        role: 'STATION_ADMIN',
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Station admin login error:', error);
    res.status(500).json({ message: 'Server error during station admin login' });
  }
};
