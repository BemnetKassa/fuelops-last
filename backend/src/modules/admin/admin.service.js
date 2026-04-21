import bcrypt from 'bcryptjs';
import { findAdminByEmail } from './admin.repository.js';

export const loginAdmin = async (email, password) => {
  const admin = await findAdminByEmail(email);

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