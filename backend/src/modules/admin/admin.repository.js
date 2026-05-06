import prisma from '../../db/prisma.js';

export const findAdminByEmail = (email) =>
	prisma.admin.findUnique({
		where: { email },
	});

export const findReports = async ({
	status,
	category,
	stationId,
	reporterId,
	stationName,
	reporterPhone,
	startDate,
	endDate,
	page,
	pageSize,
}) => {
	const where = {};
	if (status) where.status = status;
	if (category) where.category = category;
	if (stationId) where.stationId = stationId;
	if (reporterId) where.reporterId = reporterId;
	if (stationName) {
		where.station = { name: { contains: stationName, mode: 'insensitive' } };
	}
	if (reporterPhone) {
		where.reporter = { phone: { contains: reporterPhone, mode: 'insensitive' } };
	}
	if (startDate || endDate) {
		where.createdAt = {};
		if (startDate) where.createdAt.gte = new Date(startDate);
		if (endDate) where.createdAt.lte = new Date(endDate);
	}

	const skip = (page - 1) * pageSize;
	const [total, data] = await Promise.all([
		prisma.report.count({ where }),
		prisma.report.findMany({
			where,
			orderBy: { createdAt: 'desc' },
			skip,
			take: pageSize,
			include: { reporter: true, station: true },
		}),
	]);

	return { total, data };
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
