// backend/controllers/driverController.js
import { users, fuelRecords, reservations } from '../db/index.js';

// @desc    Get driver dashboard data
// @route   GET /api/driver/dashboard/:driverId
// @access  Private
export const getDriverDashboard = (req, res) => {
  // In a real app, you'd get the driverId from an authenticated session (e.g., JWT)
  // For now, we'll simulate fetching data for the first registered user if they are a driver.
  const driver = users.find(u => u.role === 'driver');

  if (!driver) {
    return res.status(404).json({ message: 'No driver found.' });
  }

  // Find the latest active reservation for this driver
  const activeReservation = reservations
    .filter(r => r.driverId === driver.id && r.status === 'active')
    .sort((a, b) => b.createdAt - a.createdAt)[0];

  const dashboardData = {
    dailyQuota: {
      remaining: driver.dailyQuota.current,
      total: driver.dailyQuota.max,
    },
    accountStatus: {
      status: driver.accountStatus,
      plateNumber: driver.licensePlate,
      fuelType: driver.fuelType || 'Petrol', // Default to Petrol if not set
    },
    activeReservation: activeReservation || null,
  };

  res.json(dashboardData);
};

// @desc    Get driver transaction history
// @route   GET /api/driver/history/:driverId
// @access  Private
export const getDriverHistory = (req, res) => {
  const driver = users.find(u => u.role === 'driver');

  if (!driver) {
    return res.status(404).json({ message: 'No driver found.' });
  }

  const history = fuelRecords.filter(record => record.driverId === driver.id);

  res.json(history);
};
