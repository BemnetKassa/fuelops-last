import pool from '../../db/pg.js';

// @desc    Create a new fuel reservation for a driver
// @route   POST /api/driver/reserve
// @access  Private
export const createDriverReservation = async (req, res) => {
  const { stationId, fuelAmount, reservationTime } = req.body;
  const driverId = req.user.id;

  if (!stationId || !fuelAmount || !reservationTime) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // Optionally: check driver's quota, station availability, etc.
    const result = await pool.query(
      'INSERT INTO "Reservation" ("driverId", "stationId", "fuelAmount", "reservationTime", status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [driverId, stationId, fuelAmount, reservationTime, 'PENDING']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
