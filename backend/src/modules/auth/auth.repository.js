import prisma from '../../db/prisma.js';

export const findUserByEmailOrPhone = (email, phone) =>
	prisma.user.findFirst({
		where: {
			OR: [{ email }, { phone }],
		},
	});

export const createUser = (data) =>
	prisma.user.create({
		data,
	});

export const findUserByPhone = (phone) =>
	prisma.user.findUnique({
		where: { phone },
	});

export const findUserById = (id) =>
	prisma.user.findUnique({
		where: { id },
	});

export const updateUserById = (id, data) =>
	prisma.user.update({
		where: { id },
		data,
	});
