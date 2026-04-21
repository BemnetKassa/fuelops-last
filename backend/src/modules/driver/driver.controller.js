import {
  getDriverDashboardService,
  getDriverHistoryService,
} from './driver.service.js';

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