import bcrypt from 'bcryptjs';
import { findAdminByEmail, findReportById, findReports, updateReportStatus } from './admin.repository.js';

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

export const listReports = (filters) => findReports(filters);

export const getReport = (id) => findReportById(id);

export const setReportStatus = (id, status) => updateReportStatus(id, status);