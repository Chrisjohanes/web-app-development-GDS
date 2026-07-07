const prisma = require("../lib/prisma");

async function getAllSermons(req, res) {
  try {
    const sermons = await prisma.sermon.findMany({
      orderBy: { id: "desc" },
    });
    res.json(sermons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data khotbah" });
  }
}

async function getSermonById(req, res) {
  try {
    const id = Number(req.params.id);
    const sermon = await prisma.sermon.findUnique({ where: { id } });

    if (!sermon) {
      return res.status(404).json({ message: "Khotbah tidak ditemukan" });
    }

    res.json(sermon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data khotbah" });
  }
}

async function createSermon(req, res) {
  try {
    const { title, preacher, date, verse, summary } = req.body;

    if (!title || !preacher || !date || !verse || !summary) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const sermon = await prisma.sermon.create({
      data: { title, preacher, date, verse, summary },
    });

    res.status(201).json(sermon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat khotbah" });
  }
}

async function updateSermon(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, preacher, date, verse, summary } = req.body;

    const sermon = await prisma.sermon.update({
      where: { id },
      data: { title, preacher, date, verse, summary },
    });

    res.json(sermon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui khotbah" });
  }
}

async function deleteSermon(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.sermon.delete({ where: { id } });
    res.json({ message: "Khotbah berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus khotbah" });
  }
}

module.exports = {
  getAllSermons,
  getSermonById,
  createSermon,
  updateSermon,
  deleteSermon,
};
