import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create some stations
  await prisma.station.createMany({
    data: [
      {
        name: 'Central Fuel Stop',
        latitude: 34.052235,
        longitude: -118.243683,
        fuelLevels: { petrol: 15000, diesel: 25000 },
      },
      {
        name: 'Eastside Gas & Go',
        latitude: 34.056,
        longitude: -118.22,
        fuelLevels: { petrol: 8000, diesel: 12000 },
      },
      {
        name: 'Westwood Fueling',
        latitude: 34.06,
        longitude: -118.44,
        fuelLevels: { petrol: 20000, diesel: 18000 },
      },
      {
        name: 'South Bay Pumps',
        latitude: 33.88,
        longitude: -118.35,
        fuelLevels: { petrol: 12000, diesel: 30000 },
      },
    ],
    skipDuplicates: true, // Don't error if stations with these names already exist
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
