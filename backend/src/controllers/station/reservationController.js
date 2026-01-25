// ...existing code...

export const createReservation = async (req, res) => {
  const { driverId, stationId, fuelAmount } = req.body;

  if (!driverId || !stationId || !fuelAmount) {
    return res.status(400).json({ message: 'Driver ID, Station ID, and fuel amount are required' });
  }

  try {
    console.log(`Attempting to create reservation with stationId: ${stationId}`);
    const reservation = await prisma.reservation.create({
      data: {
        driverId,
        stationId,
        fuelAmount,
        status: 'PENDING',
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
    });

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
