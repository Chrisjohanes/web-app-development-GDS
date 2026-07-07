const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const scheduleData = [
  {
    title: "Ibadah Anak",
    icon: "🧒",
    sessions: "Minggu, 09.00 WIB;Minggu, 14.00 WIB",
    mode: "Onsite",
    description:
      "Ibadah khusus untuk anak-anak dengan pujian, cerita Alkitab, dan aktivitas yang menyenangkan.",
  },
  {
    title: "Ibadah Youth",
    icon: "🎸",
    sessions: "Sabtu, 17.00 WIB",
    mode: "Onsite",
    description:
      "Ibadah untuk remaja & anak muda, penuh semangat dengan pujian dan pengajaran firman yang relevan.",
  },
  {
    title: "Ibadah Dewasa",
    icon: "🙏",
    sessions: "Minggu, 09.00 WIB;Minggu, 14.00 WIB",
    mode: "Onsite & Online",
    description:
      "Ibadah umum untuk seluruh jemaat dewasa, tersedia juga live streaming bagi yang berhalangan hadir.",
  },
];

async function main() {
  const existingCount = await prisma.scheduleItem.count();

  if (existingCount > 0) {
    console.log(
      `Database sudah punya ${existingCount} jadwal. Import dibatalkan supaya tidak duplikat.`,
    );
    return;
  }

  for (const item of scheduleData) {
    await prisma.scheduleItem.create({ data: item });
    console.log(`Berhasil import: ${item.title}`);
  }

  console.log(`Selesai! ${scheduleData.length} jadwal berhasil di-import.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
