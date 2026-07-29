const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sermonData = [
  {
    title: "Hidup dalam Damai Sejahtera",
    preacher: "Ps. Jesaya Henubau",
    date: "29 Juni 2026",
    verse: "Filipi 4:6-7",
    summary:
      "Damai sejahtera Tuhan melampaui akal manusia, menjaga hati dan pikiran kita dalam Kristus Yesus di tengah segala pergumulan hidup.",
  },
  {
    title: "Kasih yang Memulihkan",
    preacher: "Ps. Debora Henubau",
    date: "22 Juni 2026",
    verse: "1 Korintus 13:4-8",
    summary:
      "Kasih Kristus adalah kasih yang sabar dan memulihkan, mengajarkan kita untuk mengasihi tanpa syarat seperti yang Tuhan sudah lakukan bagi kita.",
  },
  {
    title: "Iman yang Bertumbuh",
    preacher: "Ps. Samuel V. Bernard",
    date: "15 Juni 2026",
    verse: "Ibrani 11:1",
    summary:
      "Iman adalah dasar dari segala sesuatu yang kita harapkan, dan bukti dari segala sesuatu yang tidak kita lihat — iman bertumbuh melalui firman Tuhan.",
  },
  {
    title: "Bersukacita dalam Segala Keadaan",
    preacher: "Ps. Dina Henubau",
    date: "8 Juni 2026",
    verse: "Filipi 4:4",
    summary:
      "Sukacita sejati tidak bergantung pada keadaan, melainkan pada pengenalan akan Tuhan yang selalu menyertai kita setiap waktu.",
  },
];

async function main() {
  const existingCount = await prisma.sermon.count();

  if (existingCount > 0) {
    console.log(
      `Database sudah punya ${existingCount} khotbah. Import dibatalkan supaya tidak duplikat.`
    );
    return;
  }

  for (const item of sermonData) {
    await prisma.sermon.create({ data: item });
    console.log(`Berhasil import: ${item.title}`);
  }

  console.log(`Selesai! ${sermonData.length} khotbah berhasil di-import.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
