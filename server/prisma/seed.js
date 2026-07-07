const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existing = await prisma.adminUser.findUnique({
    where: { username: "admin" },
  });

  if (existing) {
    console.log("Admin user sudah ada, skip.");
    return;
  }

  await prisma.adminUser.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("Admin user berhasil dibuat: username=admin, password=admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
