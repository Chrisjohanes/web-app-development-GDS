const prisma = require("../lib/prisma");

async function getAllSchedules(req, res) {
  try {
    const schedules = await prisma.scheduleItem.findMany({
      orderBy: { id: "asc" },
    });
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data jadwal" });
  }
}

async function getScheduleById(req, res) {
  try {
    const id = Number(req.params.id);
    const schedule = await prisma.scheduleItem.findUnique({ where: { id } });

    if (!schedule) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan" });
    }

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data jadwal" });
  }
}

async function createSchedule(req, res) {
  try {
    const { title, icon, sessions, mode, description } = req.body;

    if (!title || !icon || !sessions || !mode || !description) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const schedule = await prisma.scheduleItem.create({
      data: { title, icon, sessions, mode, description },
    });

    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat jadwal" });
  }
}

async function updateSchedule(req, res) {
  try {
    const id = Number(req.params.id);
    const { title, icon, sessions, mode, description } = req.body;

    const schedule = await prisma.scheduleItem.update({
      where: { id },
      data: { title, icon, sessions, mode, description },
    });

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui jadwal" });
  }
}

async function deleteSchedule(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.scheduleItem.delete({ where: { id } });
    res.json({ message: "Jadwal berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus jadwal" });
  }
}

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
