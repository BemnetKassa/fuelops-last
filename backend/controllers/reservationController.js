import prisma from '../db/prisma.js';

export const createReservation = async (req, res) => {
  const { driverId, stationId, fuelAmount } = req.body;

  if (!driverId || !stationId || !fuelAmount) {
    return res.status(400).json({ message: 'Driver ID, Station ID, and fuel amount are required' });
  }

  try {
    // In a real application, you would also check station fuel availability
    // and lock the amount, but for now, we'll just create the reservation.

    const reservation = await prisma.reservation.create({
      data: {
        driverId,
        stationId,
        fuelAmount,
        status: 'PENDING', // PENDING, COMPLETED, CANCELLED
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // Expires in 2 hours
      },
    });

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
