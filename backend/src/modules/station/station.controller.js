import {
	createReservationService,
	getStationsService,
	loginStationAdmin,
} from './station.service.js';

export const stationAdminLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: 'Please provide email and password' });
	}

	try {
		const stationAdmin = await loginStationAdmin({ email, password });
		if (!stationAdmin) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		return res.json(stationAdmin);
	} catch (error) {
		return res.status(500).json({ message: 'Server error during station admin login' });
	}
};

export const getStations = async (req, res) => {
	try {
		const stations = await getStationsService();
		return res.json(stations);
	} catch (error) {
		return res.status(500).json({ message: 'Server error' });
	}
};

export const createReservation = async (req, res) => {
	const { driverId, stationId, fuelAmount } = req.body;

	if (!driverId || !stationId || !fuelAmount) {
		return res.status(400).json({ message: 'Driver ID, Station ID, and fuel amount are required' });
	}

	try {
		const reservation = await createReservationService({ driverId, stationId, fuelAmount });
		return res.status(201).json({ message: 'Reservation created successfully', reservation });
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};
