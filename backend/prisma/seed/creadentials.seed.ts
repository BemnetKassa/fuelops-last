import { prisma } from "../../src/db/prisma";
import bcrypt from "bcryptjs";

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash("adminpass", 10);
  const stationAdminPassword = await bcrypt.hash("stationadminpass", 10);
  const driverPassword = await bcrypt.hash("driverpass", 10);

  // Admin
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      phone: "1234567890",
      password: adminPassword,
    },
  });

  // Station Admin
  await prisma.stationAdmin.upsert({
    where: { email: "stationadmin@example.com" },
    update: {},
    create: {
      name: "Station Admin",
      email: "stationadmin@example.com",
      phone: "0987654321",
      password: stationAdminPassword,
      stationId: "station001",
    },
  });

  // Driver (User)
  await prisma.user.upsert({
    where: { email: "driver1@example.com" },
    update: {},
    create: {
      name: "Driver One",
      email: "driver1@example.com",
      phone: "1112223333",
      password: driverPassword,
      role: "DRIVER",
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
