import prisma from '../../db/prisma.js';

export const findDriverById = (id) =>
	prisma.user.findFirst({
		where: { id, role: 'DRIVER' },
	});

export const findDriverByPhone = (phone) =>
	prisma.user.findFirst({
		where: { phone, role: 'DRIVER' },
	});

export const findDriverByEmailOrPhone = (email, phone) =>
	prisma.user.findFirst({
		where: {
			role: 'DRIVER',
			OR: [{ email }, { phone }],
		},
	});

export const createDriver = (data) =>
	prisma.user.create({
		data: {
			...data,
			role: 'DRIVER',
		},
	});

export const findActiveReservationForDriver = (driverId) =>
	prisma.reservation.findFirst({
		where: {
			driverId,
			status: { in: ['PENDING', 'CONFIRMED'] },
			expiresAt: { gt: new Date() },
		},
		orderBy: { createdAt: 'desc' },
		include: { station: true },
	});

export const findReservationsForDriver = (driverId) =>
	prisma.reservation.findMany({
		where: { driverId },
		orderBy: { createdAt: 'desc' },
		include: { station: true },
	});

export const createReservation = ({ driverId, stationId, fuelAmount, expiresAt }) =>
	prisma.reservation.create({
		data: {
			driverId,
			stationId,
			fuelAmount,
			expiresAt,
			status: 'PENDING',
		},
	});

export const findNotificationsForUser = (userId) =>
	prisma.notification.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
	});

export const markNotificationAsRead = (id) =>
	prisma.notification.update({
		where: { id },
		data: { read: true },
	});

export const seedNotifications = async (userId, messages) => {
	await prisma.notification.createMany({
		data: messages.map((message) => ({ userId, message, read: false })),
	});
};
