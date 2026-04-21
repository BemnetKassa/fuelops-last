import { loginUserService, registerUserService, updateUserService } from './auth.service.js';

export const registerUser = async (req, res) => {
	const { name, email, password, phone, role } = req.body;

	if (!name || !email || !password || !phone) {
		return res.status(400).json({ message: 'Please enter name, email, phone, and password.' });
	}

	try {
		const user = await registerUserService({ name, email, password, phone, role });
		return res.status(201).json(user);
	} catch (error) {
		const status = error.message === 'User already exists' || error.message.includes('Public registration') ? 400 : 500;
		return res.status(status).json({ message: status === 500 ? 'Server error during registration' : error.message });
	}
};

export const loginUser = async (req, res) => {
	const { phone, password } = req.body;

	if (!phone || !password) {
		return res.status(400).json({ message: 'Please provide phone and password' });
	}

	try {
		const result = await loginUserService({ phone, password });
		if (!result) {
			return res.status(401).json({ message: 'Invalid phone number or password' });
		}
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ message: 'Server error during login' });
	}
};

export const updateUser = async (req, res) => {
	try {
		const result = await updateUserService(req.params.id, req.body);
		if (!result) {
			return res.status(404).json({ message: 'User not found.' });
		}
		return res.json(result);
	} catch (error) {
		const status = error.message === 'No changes detected.' ? 400 : 500;
		return res.status(status).json({ message: status === 500 ? 'Server error during update' : error.message });
	}
};
