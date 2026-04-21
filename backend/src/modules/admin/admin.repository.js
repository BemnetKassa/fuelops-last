import prisma from '../../db/prisma.js';

export const findAdminByEmail = (email) =>
	prisma.admin.findUnique({
		where: { email },
	});
