import bcrypt from 'bcryptjs';
import pool from '../../db/pg.js';

export const loginAdmin = async (email, password) => {
  const result = await pool.query(
    'SELECT * FROM "Admin" WHERE email = $1',
    [email]
  );

  const admin = result.rows[0];

  if (!admin) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return null;
  }

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    role: 'ADMIN',
  };
};