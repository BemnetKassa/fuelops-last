import pool from '../../db/pg.js';

// @desc    Get notifications for a driver
// @route   GET /api/driver/notifications/:userId
// @access  Private
export const getDriverNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    // Ensure driver exists
    const userResult = await pool.query(
      'SELECT id FROM "User" WHERE id = $1 AND role = $2',
      [userId, 'DRIVER']
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    const result = await pool.query(
      'SELECT id, "userId", message, read, "createdAt" FROM "Notification" WHERE "userId" = $1 ORDER BY "createdAt" DESC NULLS LAST',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching driver notifications:', error);
    // If Notification table does not exist yet, just return an empty list
    if (error && error.code === '42P01') {
      return res.json([]);
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark a notification as read
// @route   PATCH /api/driver/notifications/:notificationId/read
// @access  Private
export const markNotificationRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    const result = await pool.query(
      'UPDATE "Notification" SET read = TRUE WHERE id = $1 RETURNING id, "userId", message, read, "createdAt"',
      [notificationId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    // If Notification table does not exist yet, surface a clear error
    if (error && error.code === '42P01') {
      return res.status(400).json({ message: 'Notifications are not set up in the database yet.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Seed sample notifications for a driver (DEV ONLY)
// @route   POST /api/driver/notifications/:userId/seed
// @access  Private (driver must match userId)
export const seedDriverNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    // Ensure caller is the same driver
    if (!req.user || req.user.id !== userId || req.user.role !== 'DRIVER') {
      return res.status(403).json({ message: 'Not authorized to seed notifications for this user.' });
    }

    // Ensure driver exists
    const userResult = await pool.query(
      'SELECT id FROM "User" WHERE id = $1 AND role = $2',
      [userId, 'DRIVER']
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: 'Driver not found.' });
    }

    const samples = [
      'Your fuel reservation has been confirmed at Central Station.',
      'Reminder: Your active reservation expires in 30 minutes.',
      'Your last fuel purchase has been recorded successfully.',
      'Welcome to FuelOps! Your driver account is now active.',
    ];

    for (const message of samples) {
      await pool.query(
        'INSERT INTO "Notification" ("userId", message, read) VALUES ($1, $2, $3)',
        [userId, message, false]
      );
    }

    const result = await pool.query(
      'SELECT id, "userId", message, read, "createdAt" FROM "Notification" WHERE "userId" = $1 ORDER BY "createdAt" DESC NULLS LAST',
      [userId]
    );

    res.status(201).json(result.rows);
  } catch (error) {
    console.error('Error seeding driver notifications:', error);
    if (error && error.code === '42P01') {
      return res.status(400).json({ message: 'Notifications table is not set up in the database.' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
