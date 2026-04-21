import bcrypt from 'bcryptjs';
import {
	createStationReservation,
	findAllStations,
	findStationAdminByEmail,
} from './station.repostory.js';

export const loginStationAdmin = async ({ email, password }) => {
	const stationAdmin = await findStationAdminByEmail(email);
	if (!stationAdmin) {
		return null;
	}

	const isMatch = await bcrypt.compare(password, stationAdmin.password);
	if (!isMatch) {
		return null;
	}

	return {
		id: stationAdmin.id,
		name: stationAdmin.name,
		email: stationAdmin.email,
		phone: stationAdmin.phone,
		stationId: stationAdmin.stationId,
		stationName: stationAdmin.station?.name || 'Unknown Station',
		role: 'STATION_ADMIN',
	};
};

export const getStationsService = () => findAllStations();

export const createReservationService = ({ driverId, stationId, fuelAmount }) => {
	const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
	return createStationReservation({ driverId, stationId, fuelAmount, expiresAt });
};
