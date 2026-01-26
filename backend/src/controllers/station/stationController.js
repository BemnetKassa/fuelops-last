import pool from '../../db/pg.js';

export const getStations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Station"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
