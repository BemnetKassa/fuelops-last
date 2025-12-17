// backend/controllers/stationController.js
import { stations } from '../db/index.js';

// @desc    Get all stations
// @route   GET /api/stations
// @access  Private
export const getStations = (req, res) => {
  res.json(stations);
};
