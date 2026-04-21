import pool from '../../db/pg.js';

export const getDriverDashboardService = async (userId) => {
  const userResult = await pool.query(
    'SELECT id, role, name, "licensePlate", "fuelType" FROM "User" WHERE id = $1 AND role = $2',
    [userId, 'DRIVER']
  );

  if (userResult.rowCount === 0) {
    return null;
  }

  const user = userResult.rows[0];

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

  return {
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
};

export const getDriverHistoryService = async (userId) => {
  const userResult = await pool.query(
    'SELECT id FROM "User" WHERE id = $1 AND role = $2',
    [userId, 'DRIVER']
  );

  if (userResult.rowCount === 0) {
    return null;
  }

  const frResult = await pool.query(
    `SELECT fr.*, s.name as "stationName"
     FROM "FuelRecord" fr
     LEFT JOIN "Station" s ON s.id = fr."stationId"
     WHERE fr."userId" = $1
     ORDER BY fr."createdAt" DESC NULLS LAST`,
    [userId]
  );

  const fuelRecords = frResult.rows.map((fr) => ({
    id: fr.id,
    liters: fr.liters ?? fr.fuelAmount ?? 0,
    amount: fr.amount ?? 0,
    createdAt: fr.createdAt,
    station: {
      name: fr.stationName || 'Unknown Station',
    },
  }));

  const rResult = await pool.query(
    `SELECT r.*, s.name as "stationName"
     FROM "Reservation" r
     LEFT JOIN "Station" s ON s.id = r."stationId"
     WHERE r."driverId" = $1
     ORDER BY r."createdAt" DESC NULLS LAST`,
    [userId]
  );

  const reservations = rResult.rows.map((r) => ({
    id: r.id,
    fuelAmount: r.fuelAmount ?? r.liters ?? 0,
    status: r.status,
    expiresAt: r.expiresAt,
    createdAt: r.createdAt,
    station: {
      name: r.stationName || 'Unknown Station',
    },
  }));

  return { fuelRecords, reservations };
};