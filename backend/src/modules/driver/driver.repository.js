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

export const createReservation = ({ driverId, stationId, fuelAmount, fuelType, expiresAt }) =>
	prisma.reservation.create({
		data: {
			driverId,
			stationId,
			fuelAmount,
			fuelType,
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

export const createReport = ({ reporterId, stationId, category, title, description }) =>
	prisma.report.create({
		data: {
			reporterId,
			stationId,
			category,
			title,
			description,
		},
	});

export const findReportsByReporter = (reporterId) =>
	prisma.report.findMany({
		where: { reporterId },
		orderBy: { createdAt: 'desc' },
		include: { station: true },
	});
