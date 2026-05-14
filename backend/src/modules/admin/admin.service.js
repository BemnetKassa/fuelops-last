import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findAdminByEmail, findReportById, findReports, updateReportStatus, findDrivers, findStations } from './admin.repository.js';

export const loginAdmin = async (email, password) => {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return null;
  }

  const token = jwt.sign(
    { id: admin.id, role: 'ADMIN', email: admin.email, name: admin.name },
    process.env.JWT_SECRET || 'changeme',
    { expiresIn: '7d' }
  );

  return {
    token,
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    role: 'ADMIN',
  };
};
export const getAdminProfile = async (adminId) => {
  const admin = await findAdminByEmail(adminId);
  if (!admin) {
    throw new Error('Admin not found');
  }
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    role: 'ADMIN',
  };
}

export const listReports = (filters) => findReports(filters);

export const getReport = (id) => findReportById(id);

export const setReportStatus = (id, status) => updateReportStatus(id, status);

export const listDrivers = () => findDrivers();

export const listStations = () => findStations();