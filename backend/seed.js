import 'dotenv/config';
import bcrypt from 'bcryptjs';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  await client.connect();

  // Hash passwords
  const adminPassword = await bcrypt.hash('adminpass', 10);
  const stationAdminPassword = await bcrypt.hash('stationadminpass', 10);
  const driverPassword = await bcrypt.hash('driverpass', 10);

  // Seed Admin
  await client.query(
    `INSERT INTO "Admin" ("name", "email", "phone", "password")
     VALUES ($1, $2, $3, $4)
     ON CONFLICT ("email") DO NOTHING`,
    ['Super Admin', 'admin@example.com', '1234567890', adminPassword]
  );

  // Seed StationAdmin
  await client.query(
    `INSERT INTO "StationAdmin" ("name", "email", "phone", "password", "stationId")
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT ("email") DO NOTHING`,
    ['Station Admin', 'stationadmin@example.com', '0987654321', stationAdminPassword, 'station001']
  );

  // Seed Driver (User)
  await client.query(
    `INSERT INTO "User" ("name", "email", "phone", "password", "role")
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT ("email") DO NOTHING`,
    ['Driver One', 'driver1@example.com', '1112223333', driverPassword, 'DRIVER']
  );

  await client.end();
  console.log('Seeding complete!');
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});