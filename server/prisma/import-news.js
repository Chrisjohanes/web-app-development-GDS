const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Data yang sama seperti di src/data/newsData.js (frontend)
// `body` di sini digabung jadi satu string dengan pemisah "\n\n" antar paragraf
const newsData = [
  {
    title: "Dipromosikan ke dalam Kemuliaan Bapa di Surga",
    date: "14 Maret 2021",
    excerpt:
      "Mengenang kepergian perintis dan bapak rohani GDS menuju kemuliaan surga, sebuah warisan iman yang terus menjadi teladan bagi jemaat.",
    body: [
      "Pada tanggal 7 Desember 2020, GEKARI Damai Sejahtera mengenang kepergian perintis dan bapak rohani gereja menuju kemuliaan Bapa di surga.",
      "Warisan iman dan pelayanan yang beliau tinggalkan terus menjadi teladan bagi seluruh jemaat GDS, mengingatkan kita akan kesetiaan dalam menjalankan panggilan Tuhan hingga akhir hayat.",
      "Seluruh keluarga besar GDS mengucap syukur atas jejak pelayanan yang telah diwariskan, dan berkomitmen untuk terus meneruskan visi dan misi yang telah dirintis.",
    ].join("\n\n"),
    image:
      "https://gds.or.id/wp-content/uploads/2021/03/WhatsApp-Image-2020-12-31-at-16.20.58.jpeg",
  },
  {
    title: "Pelayanan Dr. Rodney Howard Browne",
    date: "17 Februari 2020",
    excerpt:
      "Tuhan selalu menyediakan hal-hal baru dan berkat berkelimpahan bagi anak-anak-Nya melalui pelayanan yang penuh urapan.",
    body: [
      "Dr. Rodney Howard Browne melayani jemaat GDS dalam sebuah ibadah yang penuh urapan dan kuasa Tuhan.",
      "Melalui pelayanan ini, jemaat diingatkan bahwa Tuhan senantiasa menyediakan hal-hal baru dan berkat yang berkelimpahan bagi setiap anak-Nya yang percaya.",
      "Banyak jemaat mengalami penyegaran rohani dan pemulihan iman melalui firman yang disampaikan pada kesempatan tersebut.",
    ].join("\n\n"),
    image: "https://gds.or.id/wp-content/uploads/2020/03/Rodney2f.jpg",
  },
  {
    title: "Ibadah Spesial Natal 2019 bersama Rev. Paul Yadao",
    date: "10 Januari 2020",
    excerpt:
      "Merayakan kasih Tuhan yang begitu besar bagi umat manusia dalam ibadah Natal yang penuh sukacita bersama jemaat GDS.",
    body: [
      "Ibadah Natal spesial tahun 2019 diadakan bersama Rev. Paul Yadao, menghadirkan sukacita dan perayaan kasih Tuhan yang begitu besar bagi umat manusia.",
      "Jemaat GDS bersukacita merayakan kelahiran Tuhan Yesus Kristus, mengenang kembali makna Natal sebagai wujud kasih Allah yang mengaruniakan Anak-Nya bagi keselamatan dunia.",
    ].join("\n\n"),
    image: "https://gds.or.id/wp-content/uploads/2019/12/15des1.jpg",
  },
  {
    title: "Jakarta Christmas Festival 2019",
    date: "20 Desember 2019",
    excerpt:
      "Perayaan Natal terobosan bagi umat Kristiani se-Jakarta, menghadirkan sukacita dan pengharapan bagi banyak orang.",
    body: [
      "Jakarta Christmas Festival 2019 menjadi perayaan Natal terobosan yang mempertemukan umat Kristiani dari berbagai gereja se-Jakarta.",
      "Acara ini menghadirkan sukacita, pujian, dan pengharapan bagi banyak orang, sekaligus menjadi kesempatan untuk bersaksi tentang kasih Kristus kepada kota Jakarta.",
    ].join("\n\n"),
    image: "https://gds.or.id/wp-content/uploads/2019/12/lap1.jpg",
  },
  {
    title: "Pelayanan Ibadah Minggu Rev. Richard William",
    date: "18 November 2019",
    excerpt:
      "Jemaat GDS menerima berkat yang luar biasa dalam pelayanan firman yang membangun iman dan pengharapan.",
    body: [
      "Rev. Richard William melayani jemaat GDS dalam ibadah Minggu dengan firman yang membangun iman dan pengharapan.",
      "Jemaat menerima berkat yang luar biasa serta diteguhkan untuk terus bertumbuh dalam iman di tengah tantangan kehidupan sehari-hari.",
    ].join("\n\n"),
    image: "https://gds.or.id/wp-content/uploads/2019/12/RevRichard3.jpg",
  },
  {
    title: "Retreat Keluarga GDS",
    date: "1 Juni 2019",
    excerpt:
      "Rencana Tuhan senantiasa mengubahkan setiap keluarga dari kemuliaan kepada kemuliaan yang lebih besar lagi.",
    body: [
      "Retreat Keluarga GDS diadakan pada 30 Mei hingga 1 Juni 2019, menjadi momen berharga bagi keluarga-keluarga jemaat untuk semakin dekat satu sama lain dan dengan Tuhan.",
      "Melalui retreat ini, banyak keluarga mengalami pemulihan dan pembaharuan, sesuai dengan rencana Tuhan yang senantiasa mengubahkan keluarga dari kemuliaan kepada kemuliaan yang lebih besar lagi.",
    ].join("\n\n"),
    image:
      "https://gds.or.id/wp-content/uploads/2019/06/27783D57-7266-4E2C-8964-E7D6A6023C33.jpeg",
  },
];

async function main() {
  const existingCount = await prisma.news.count();

  if (existingCount > 0) {
    console.log(
      `Database sudah punya ${existingCount} berita. Import dibatalkan supaya tidak duplikat.`
    );
    console.log(
      "Kalau mau import ulang dari nol, hapus dulu semua data News lewat Prisma Studio."
    );
    return;
  }

  for (const item of newsData) {
    await prisma.news.create({ data: item });
    console.log(`Berhasil import: ${item.title}`);
  }

  console.log(`Selesai! ${newsData.length} berita berhasil di-import.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
