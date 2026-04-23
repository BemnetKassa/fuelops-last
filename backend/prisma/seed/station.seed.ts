import { prisma } from "../../src/db/prisma";

async function seedStations() {
  const stations = [
    {
      name: "Total Energies Bole Station",
      location: "Bole Road, Addis Ababa",
      latitude: 8.9806,
      longitude: 38.7578,
    },
    {
      name: "National Oil Mexico Station",
      location: "Mexico Square, Addis Ababa",
      latitude: 9.0222,
      longitude: 38.7468,
    },
    {
      name: "Kobil Kazanchis Fuel Station",
      location: "Kazanchis, Addis Ababa",
      latitude: 9.0185,
      longitude: 38.7632,
    },
    {
      name: "Shell CMC Station",
      location: "CMC Road, Addis Ababa",
      latitude: 9.0443,
      longitude: 38.8112,
    },
    {
      name: "Horizon Fuel Lideta",
      location: "Lideta, Addis Ababa",
      latitude: 9.0108,
      longitude: 38.7286,
    },
    {
      name: "Total Energies Ayat Station",
      location: "Ayat, Addis Ababa",
      latitude: 8.9504,
      longitude: 38.8532,
    },
    {
      name: "National Oil Kaliti Station",
      location: "Kaliti Industrial Area, Addis Ababa",
      latitude: 8.9156,
      longitude: 38.7891,
    },
    {
      name: "Kobil Saris Station",
      location: "Saris, Addis Ababa",
      latitude: 8.9961,
      longitude: 38.7154,
    },
    {
      name: "Shell Megenagna Station",
      location: "Megenagna, Addis Ababa",
      latitude: 9.032,
      longitude: 38.7935,
    },
    {
      name: "Horizon Bole Michael Station",
      location: "Bole Michael, Addis Ababa",
      latitude: 8.9952,
      longitude: 38.7809,
    },
  ];

  for (const station of stations) {
    await prisma.station.upsert({
      where: { name: station.name },
      update: {},
      create: {
        name: station.name,
        location: station.location,
        latitude: station.latitude,
        longitude: station.longitude,
      },
    });
  }

  console.log("⛽ Stations with coordinates seeded!");
}

seedStations().catch((e) => {
  console.error(e);
});

export default seedStations;
