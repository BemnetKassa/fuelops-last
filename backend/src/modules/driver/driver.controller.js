import {
  createDriverReservationService,
  createDriverReportService,
  getDriverDashboardService,
  getDriverHistoryService,
  getDriverNotificationsService,
  getDriverReportsService,
  loginDriverService,
  markNotificationReadService,
  registerDriverService,
  seedDriverNotificationsService,
} from './driver.service.js';

export const registerUser = async (req, res) => {
  const { name, email, password, phone, licensePlate, drivingLicenseId, carType, fuelType } = req.body;

  if (!name || !email || !password || !phone || !licensePlate || !drivingLicenseId || !carType || !fuelType) {
    return res.status(400).json({
      message:
        'Please enter name, email, phone, password, license plate, driving license ID, car type, and fuel type.',
    });
  }

  try {
    const user = await registerDriverService({
      name,
      email,
      password,
      phone,
      licensePlate,
      drivingLicenseId,
      carType,
      fuelType,
    });
    return res.status(201).json(user);
  } catch (error) {
    const status = error.message === 'User already exists' ? 400 : 500;
    return res.status(status).json({ message: status === 500 ? 'Server error during registration' : error.message });
  }
};

export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Please provide phone and password' });
  }

  try {
    const result = await loginDriverService({ phone, password });
    if (!result) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login' });
  }
};

export const getDriverDashboard = async (req, res) => {
  try {
    const data = await getDriverDashboardService(req.params.userId);

    if (!data) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDriverHistory = async (req, res) => {
  try {
    const data = await getDriverHistoryService(req.params.userId);

    if (!data) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const createDriverReservation = async (req, res) => {
  const { stationId, fuelAmount, fuelType } = req.body;
  const driverId = req.user.id;

  if (!stationId || !fuelAmount || !fuelType) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const reservation = await createDriverReservationService({ stationId, fuelAmount, fuelType, driverId });
    return res.status(201).json(reservation);
  } catch (error) {
    if (error?.code === "P2003") {
      return res.status(400).json({
        message: "Invalid stationId or driverId (foreign key constraint).",
      });
    }

    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Related record not found." });
    }

    return res.status(500).json({ message: "Server error while creating reservation." });
  }
};


export const getDriverNotifications = async (req, res) => {
  try {
    const notifications = await getDriverNotificationsService(req.params.userId);
    if (!notifications) {
      return res.status(404).json({ message: 'Driver not found.' });
    }
    return res.json(notifications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


export const markNotificationRead = async (req, res) => {
  try {
    const notification = await markNotificationReadService(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    return res.json(notification);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


export const seedDriverNotifications = async (req, res) => {
  const { userId } = req.params;

  if (!req.user || req.user.id !== userId || req.user.role !== 'DRIVER') {
    return res.status(403).json({ message: 'Not authorized to seed notifications for this user.' });
  }

  try {
    const notifications = await seedDriverNotificationsService(userId);
    return res.status(201).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


export const createDriverReport = async (req, res) => {
  const reporterId = req.user?.id;
  const { stationId, category, title, description } = req.body;

  if (!reporterId) {
    return res.status(401).json({ message: 'Invalid token payload.' });
  }

  if (!category || !title || !description) {
    return res.status(400).json({ message: 'category, title, and description are required.' });
  }

  try {
    const report = await createDriverReportService({
      reporterId,
      stationId: stationId || null,
      category,
      title,
      description,
    });

    if (!report) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    return res.status(201).json(report);
  } catch (error) {
    if (error?.code === 'P2003') {
      return res.status(400).json({ message: 'Invalid stationId (foreign key constraint).' });
    }
    return res.status(500).json({ message: 'Server error while creating report.' });
  }
};


export const getDriverReports = async (req, res) => {
  const reporterId = req.user?.id;

  if (!reporterId) {
    return res.status(401).json({ message: 'Invalid token payload.' });
  }

  try {
    const reports = await getDriverReportsService(reporterId);
    if (!reports) {
      return res.status(404).json({ message: 'Driver not found.' });
    }
    return res.json(reports);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching reports.' });
  }
};
