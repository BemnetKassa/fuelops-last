import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  createDriver,
  createReservation,
  findActiveReservationForDriver,
  findDriverByEmailOrPhone,
  findDriverById,
  findDriverByPhone,
  findNotificationsForUser,
  findReservationsForDriver,
  markNotificationAsRead,
  seedNotifications,
} from './driver.repository.js';

const signToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, phone: user.phone, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'changeme',
    { expiresIn: '7d' }
  );

export const registerDriverService = async (payload) => {
  const { name, email, password, phone, licensePlate, drivingLicenseId, carType, fuelType } = payload;

  const existing = await findDriverByEmailOrPhone(email, phone);
  if (existing) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createDriver({
    name,
    email,
    password: hashedPassword,
    phone,
    licensePlate,
    drivingLicenseId,
    carType,
    fuelType,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    licensePlate: user.licensePlate,
    carType: user.carType,
    fuelType: user.fuelType,
  };
};

export const loginDriverService = async ({ phone, password }) => {
  const user = await findDriverByPhone(phone);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  return {
    token: signToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      licensePlate: user.licensePlate,
      drivingLicenseId: user.drivingLicenseId,
      carType: user.carType,
      fuelType: user.fuelType,
    },
  };
};

export const getDriverDashboardService = async (userId) => {
  const user = await findDriverById(userId);
  if (!user) {
    return null;
  }

  const activeReservation = await findActiveReservationForDriver(userId);

  return {
    dailyQuota: { remaining: 0, total: 0 },
    accountStatus: {
      status: 'active',
      plateNumber: user.licensePlate || 'N/A',
      fuelType: user.fuelType || 'N/A',
    },
    activeReservation: activeReservation
      ? {
          stationName: activeReservation.station?.name || 'Unknown Station',
          fuelAmount: activeReservation.fuelAmount,
          expiresAt: activeReservation.expiresAt,
        }
      : null,
  };
};

export const getDriverHistoryService = async (userId) => {
  const user = await findDriverById(userId);
  if (!user) {
    return null;
  }

  const fuelRecords = [];
  const dbReservations = await findReservationsForDriver(userId);
  const reservations = dbReservations.map((r) => ({
    id: r.id,
    fuelAmount: r.fuelAmount ?? 0,
    status: r.status,
    expiresAt: r.expiresAt,
    createdAt: r.createdAt,
    station: {
      name: r.station?.name || 'Unknown Station',
    },
  }));

  return { fuelRecords, reservations };
};

export const createDriverReservationService = async ({ stationId, fuelAmount, driverId }) => {
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  return createReservation({
    driverId,
    stationId,
    fuelAmount: Number(fuelAmount),
    expiresAt,
  });
};

export const getDriverNotificationsService = async (userId) => {
  const user = await findDriverById(userId);
  if (!user) {
    return null;
  }

  return findNotificationsForUser(userId);
};

export const markNotificationReadService = async (notificationId) => {
  try {
    return await markNotificationAsRead(notificationId);
  } catch (error) {
    if (error.code === 'P2025') {
      return null;
    }
    throw error;
  }
};

export const seedDriverNotificationsService = async (userId) => {
  const messages = [
    'Your fuel reservation has been confirmed at Central Station.',
    'Reminder: Your active reservation expires in 30 minutes.',
    'Your last fuel purchase has been recorded successfully.',
    'Welcome to FuelOps! Your driver account is now active.',
  ];

  await seedNotifications(userId, messages);
  return findNotificationsForUser(userId);
};