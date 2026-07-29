const prisma = require("../lib/prisma");

// GET /api/news - ambil semua berita, urut terbaru dulu
async function getAllNews(req, res) {
  try {
    const news = await prisma.news.findMany({
      orderBy: { id: "desc" },
    });
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data berita" });
  }
}

// GET /api/news/:id - ambil satu berita
async function getNewsById(req, res) {
  try {
    const id = Number(req.params.id);
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data berita" });
  }
}

// POST /api/news - tambah berita baru (admin only)
async function createNews(req, res) {
  try {
    const { title, date, excerpt, body, image } = req.body;

    if (!title || !date || !excerpt || !body || !image) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const news = await prisma.news.create({
      data: { title, date, excerpt, body, image },
    });

    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat berita" });
  }
}

// PUT /api/news/:id - edit berita (admin only)
async function updateNews(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, date, excerpt, body, image } = req.body;

    const news = await prisma.news.update({
      where: { id },
      data: { title, date, excerpt, body, image },
    });

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui berita" });
  }
}

// DELETE /api/news/:id - hapus berita (admin only)
async function deleteNews(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.news.delete({ where: { id } });
    res.json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus berita" });
  }
}

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
