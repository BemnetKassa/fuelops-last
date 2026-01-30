import pool from '../../db/pg.js';

// @desc    Get driver dashboard data
// @route   GET /api/driver/dashboard/:userId
// @access  Private
export const getDriverDashboard = async (req, res) => {
	const { userId } = req.params;
	try {
		// Verify driver exists (role DRIVER)
		const userResult = await pool.query(
			'SELECT id, role, name, "licensePlate", "fuelType" FROM "User" WHERE id = $1 AND role = $2',
			[userId, 'DRIVER']
		);
		if (userResult.rowCount === 0) {
			return res.status(404).json({ message: 'Driver not found.' });
		}

		const user = userResult.rows[0];

		// Latest active reservation
		const resvResult = await pool.query(
			`SELECT r.id, r."fuelAmount", r."expiresAt", s.name as "stationName"
			 FROM "Reservation" r
			 LEFT JOIN "Station" s ON s.id = r."stationId"
			 WHERE r."driverId" = $1 AND r.status IN ('PENDING','CONFIRMED') AND r."expiresAt" > NOW()
			 ORDER BY r."createdAt" DESC NULLS LAST
			 LIMIT 1`,
			[userId]
		);

		const activeReservation = resvResult.rows[0] || null;

		const dashboardData = {
			dailyQuota: { remaining: 0, total: 0 },
			accountStatus: {
				status: 'active',
				plateNumber: user.licensePlate || 'N/A',
				fuelType: user.fuelType || 'N/A',
			},
			activeReservation: activeReservation
				? {
						stationName: activeReservation.stationName || 'Unknown Station',
						fuelAmount: activeReservation.fuelAmount,
						expiresAt: activeReservation.expiresAt,
				  }
				: null,
		};

		res.json(dashboardData);
	} catch (error) {
		console.error('Error fetching driver dashboard:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// @desc    Get driver transaction history
// @route   GET /api/driver/history/:userId
// @access  Private
export const getDriverHistory = async (req, res) => {
	const { userId } = req.params;
	try {
		// Confirm driver exists
		const userResult = await pool.query(
			'SELECT id FROM "User" WHERE id = $1 AND role = $2',
			[userId, 'DRIVER']
		);
		if (userResult.rowCount === 0) {
			return res.status(404).json({ message: 'Driver not found.' });
		}

		// Fuel records
		let fuelRecords = [];
		try {
			const frResult = await pool.query(
				`SELECT fr.*, s.name as "stationName"
				 FROM "FuelRecord" fr
				 LEFT JOIN "Station" s ON s.id = fr."stationId"
				 WHERE fr."userId" = $1
				 ORDER BY fr."createdAt" DESC NULLS LAST`,
				[userId]
			);
			fuelRecords = frResult.rows.map((fr) => ({
				id: fr.id,
				liters: fr.liters ?? fr.fuelAmount ?? 0,
				amount: fr.amount ?? 0,
				createdAt: fr.createdAt,
				station: {
					name: fr.stationName || 'Unknown Station',
				},
			}));
		} catch (e) {
			fuelRecords = [];
		}

		// Reservations history
		let reservations = [];
		try {
			const rResult = await pool.query(
				`SELECT r.*, s.name as "stationName"
				 FROM "Reservation" r
				 LEFT JOIN "Station" s ON s.id = r."stationId"
				 WHERE r."driverId" = $1
				 ORDER BY r."createdAt" DESC NULLS LAST`,
				[userId]
			);
			reservations = rResult.rows.map((r) => ({
				id: r.id,
				fuelAmount: r.fuelAmount ?? r.liters ?? 0,
				status: r.status,
				expiresAt: r.expiresAt,
				createdAt: r.createdAt,
				station: {
					name: r.stationName || 'Unknown Station',
				},
			}));
		} catch (e) {
			reservations = [];
		}

		res.json({ fuelRecords, reservations });
	} catch (error) {
		console.error('Error fetching driver history:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
