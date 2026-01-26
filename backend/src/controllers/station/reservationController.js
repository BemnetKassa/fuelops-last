import pool from '../../db/pg.js';

export const createReservation = async (req, res) => {
  const { driverId, stationId, fuelAmount } = req.body;

  if (!driverId || !stationId || !fuelAmount) {
    return res.status(400).json({ message: 'Driver ID, Station ID, and fuel amount are required' });
  }

  try {
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const result = await pool.query(
      `INSERT INTO "Reservation" ("driverId", "stationId", "fuelAmount", "status", "expiresAt")
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, "driverId", "stationId", "fuelAmount", "status", "expiresAt"`,
      [driverId, stationId, fuelAmount, 'PENDING', expiresAt]
    );

    res.status(201).json({ message: 'Reservation created successfully', reservation: result.rows[0] });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
