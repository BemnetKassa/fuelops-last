import prisma from '../../db/prisma.js';

export const findAdminByEmail = (email) =>
	prisma.admin.findUnique({
		where: { email },
	});

export const findReports = ({ status, category, stationId, reporterId }) => {
	const where = {};
	if (status) where.status = status;
	if (category) where.category = category;
	if (stationId) where.stationId = stationId;
	if (reporterId) where.reporterId = reporterId;

	return prisma.report.findMany({
		where,
		orderBy: { createdAt: 'desc' },
		include: { reporter: true, station: true },
	});
};

export const findReportById = (id) =>
	prisma.report.findUnique({
		where: { id },
		include: { reporter: true, station: true },
	});

export const updateReportStatus = (id, status) =>
	prisma.report.update({
		where: { id },
		data: { status },
	});
