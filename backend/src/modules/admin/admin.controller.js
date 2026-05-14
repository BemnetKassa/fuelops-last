import { getReport, listReports, loginAdmin, setReportStatus, getAdminProfile, listDrivers, listStations } from './admin.service.js';

const allowedStatuses = new Set(['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED']);

const ensureAdmin = (req, res) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN') {
    res.status(403).json({ message: 'Forbidden: Admins only' });
    return false;
  }
  return true;
};

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

export const getProfileAdmin = async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  try {
    const adminProfile = await getAdminProfile(req.user.email);
    return res.json(adminProfile);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return res.status(500).json({ message: 'Server error while fetching admin profile.' });
  }

};


export const getReports = async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const {
    status,
    category,
    stationId,
    reporterId,
    stationName,
    reporterPhone,
    startDate,
    endDate,
    page = '1',
    pageSize = '20',
  } = req.query;

  const pageNumber = Math.max(1, Number(page) || 1);
  const sizeNumber = Math.min(100, Math.max(1, Number(pageSize) || 20));

  try {
    const { total, data } = await listReports({
      status,
      category,
      stationId,
      reporterId,
      stationName,
      reporterPhone,
      startDate,
      endDate,
      page: pageNumber,
      pageSize: sizeNumber,
    });
    return res.json({
      total,
      page: pageNumber,
      pageSize: sizeNumber,
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching reports.' });
  }
};

export const getReportById = async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  try {
    const report = await getReport(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }
    return res.json(report);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching report.' });
  }
};

export const updateReportStatus = async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  const { status } = req.body;
  if (!status || !allowedStatuses.has(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const updated = await setReportStatus(req.params.id, status);
    return res.json(updated);
  } catch (error) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ message: 'Report not found.' });
    }
    return res.status(500).json({ message: 'Server error while updating report.' });
  }
};

export const getDrivers = async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  try {
    const drivers = await listDrivers();
    return res.json(drivers);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching drivers.' });
  }
};

export const getStations = async (req, res) => {
  if (!ensureAdmin(req, res)) return;

  try {
    const stations = await listStations();
    return res.json(stations);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching stations.' });
  }
};