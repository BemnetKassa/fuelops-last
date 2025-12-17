import { prisma } from '../db/prisma.js';

// @desc    Get all stations
// @route   GET /api/stations
// @access  Private
export const getStations = async (req, res) => {
  try {
    const stations = await prisma.station.findMany();
    res.json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ message: "Server error" });
  }
};
