import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
	createUser,
	findUserByEmailOrPhone,
	findUserById,
	findUserByPhone,
	updateUserById,
} from './auth.repository.js';

const signToken = (user) =>
	jwt.sign(
		{ id: user.id, role: user.role, phone: user.phone, email: user.email, name: user.name },
		process.env.JWT_SECRET || 'changeme',
		{ expiresIn: '7d' }
	);

export const registerUserService = async ({ name, email, password, phone, role = 'DRIVER' }) => {
	if (role !== 'DRIVER') {
		throw new Error('Public registration is only for drivers.');
	}

	const existing = await findUserByEmailOrPhone(email, phone);
	if (existing) {
		throw new Error('User already exists');
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await createUser({
		name,
		email,
		phone,
		password: hashedPassword,
		role,
	});

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		role: user.role,
	};
};

export const loginUserService = async ({ phone, password }) => {
	const user = await findUserByPhone(phone);
	if (!user) {
		return null;
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return null;
	}

	return {
		token: signToken(user),
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			role: user.role,
		},
	};
};

export const updateUserService = async (id, payload) => {
	const current = await findUserById(id);
	if (!current) {
		return null;
	}

	const data = {};
	if (payload.name && payload.name !== current.name) data.name = payload.name;
	if (payload.email && payload.email !== current.email) data.email = payload.email;
	if (payload.phone && payload.phone !== current.phone) data.phone = payload.phone;
	if (payload.password) {
		data.password = await bcrypt.hash(payload.password, 10);
	}

	if (Object.keys(data).length === 0) {
		throw new Error('No changes detected.');
	}

	const user = await updateUserById(id, data);
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		role: user.role,
		message: 'Profile updated successfully!',
	};
};
