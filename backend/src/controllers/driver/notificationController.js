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
