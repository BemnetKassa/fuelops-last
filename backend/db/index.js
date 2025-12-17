// backend/db/index.js

// In-memory store for users
export const users = [];

// In-memory store for stations
export const stations = [
  {
    id: 'station-1',
    name: 'FuelUp Central',
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    fuelStock: {
      petrol: 5000, // liters
      diesel: 2500,
    },
    queueLength: 5, // number of vehicles
  },
  {
    id: 'station-2',
    name: 'Gas & Go Downtown',
    location: { lat: 34.056, lng: -118.251 },
    fuelStock: {
      petrol: 1500,
      diesel: 800,
    },
    queueLength: 12,
  },
  {
    id: 'station-3',
    name: 'Eastside Energy',
    location: { lat: 34.049, lng: -118.233 },
    fuelStock: {
      petrol: 0,
      diesel: 300,
    },
    queueLength: 2,
  },
  {
    id: 'station-4',
    name: 'Westside Petroleum',
    location: { lat: 34.06, lng: -118.26 },
    fuelStock: {
      petrol: 8000,
      diesel: 4000,
    },
    queueLength: 3,
  },
];

// In-memory store for reservations
export const reservations = [
    {
        id: 'res-1',
        driverId: 'user-1671234567890', // Corresponds to a driver
        stationId: 'station-2',
        liters: 15,
        status: 'active', // 'active' | 'expired' | 'completed'
        createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        expiresAt: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
    }
];

// In-memory store for fuel records/transactions
export const fuelRecords = [
    {
        id: 'rec-1',
        driverId: 'user-1671234567890',
        stationId: 'station-1',
        liters: 18,
        status: 'completed',
        date: '2025-12-16T10:00:00Z',
    },
    {
        id: 'rec-2',
        driverId: 'user-1671234567890',
        stationId: 'station-4',
        liters: 20,
        status: 'completed',
        date: '2025-12-15T14:30:00Z',
    },
];
