import prisma from '../../db/prisma.js';

export const findStationAdminByEmail = (email) =>
	prisma.stationAdmin.findUnique({
		where: { email },
		include: { station: true },
	});

export const findAllStations = () => prisma.station.findMany();

export const createStationReservation = ({ driverId, stationId, fuelAmount, expiresAt }) =>
	prisma.reservation.create({
		data: {
			driverId,
			stationId,
			fuelAmount: Number(fuelAmount),
			status: 'PENDING',
			expiresAt,
		},
	});
