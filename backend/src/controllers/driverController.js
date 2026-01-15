// ...existing code...

// @desc    Get driver dashboard data
// @route   GET /api/driver/dashboard/:userId
// @access  Private
export const getDriverDashboard = async (req, res) => {
  const { userId } = req.params;

  try {
    const driverUser = await prisma.user.findUnique({
      where: { id: userId, role: 'DRIVER' },
      include: {
        driverProfile: true,
        vehicles: true,
        reservations: {
          where: {
            status: { in: ['PENDING', 'CONFIRMED'] },
            expiresAt: { gt: new Date() }
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            station: true,
          }
        }
      }
    });

    if (!driverUser || !driverUser.driverProfile) {
      return res.status(404).json({ message: 'Driver not found or driver profile is incomplete.' });
    }

    const activeReservation = driverUser.reservations[0];
    const primaryVehicle = driverUser.vehicles[0];

    const dashboardData = {
      dailyQuota: {
        remaining: driverUser.driverProfile.dailyQuotaRemaining,
        total: driverUser.driverProfile.dailyQuotaTotal,
      },
      accountStatus: {
        status: driverUser.driverProfile.accountStatus.toLowerCase(), // 'active' | 'suspended'
        plateNumber: primaryVehicle ? primaryVehicle.plateNumber : 'N/A',
        fuelType: primaryVehicle ? primaryVehicle.fuelType : 'N/A',
      },
      activeReservation: activeReservation ? {
        stationName: activeReservation.station.name,
        fuelAmount: activeReservation.fuelAmount,
        expiresAt: activeReservation.expiresAt.toISOString(),
      } : null,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Error fetching driver dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get driver transaction history
// @route   GET /api/driver/history/:userId
// @access  Private
export const getDriverHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const driverUser = await prisma.user.findUnique({
            where: { id: userId, role: 'DRIVER' },
        });

        if (!driverUser) {
            return res.status(404).json({ message: 'Driver not found.' });
        }

        const fuelRecords = await prisma.fuelRecord.findMany({
            where: { userId: driverUser.id },
            include: {
                station: {
                    select: { name: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const reservations = await prisma.reservation.findMany({
            where: { driverId: userId },
            orderBy: { createdAt: 'desc' },
            include: {
                station: {
                select: { name: true },
                },
            },
        });

        res.json({ fuelRecords, reservations });
    } catch (error) {
        console.error("Error fetching driver history:", error);
        res.status(500).json({ message: "Server error" });
    }
};
