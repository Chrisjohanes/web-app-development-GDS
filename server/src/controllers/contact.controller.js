const prisma = require("../lib/prisma");

// POST /api/contact - jemaat kirim pesan (public, tidak perlu login)
async function submitContact(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    res.status(201).json({
      message: "Pesan berhasil terkirim, terima kasih!",
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengirim pesan" });
  }
}

// GET /api/contact - admin lihat semua pesan (protected)
async function getAllContacts(req, res) {
  try {
    const contacts = await prisma.contactMessage.findMany({
      orderBy: { id: "desc" },
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data pesan" });
  }
}

// PUT /api/contact/:id/read - tandai sudah dibaca (protected)
async function markAsRead(req, res) {
  try {
    const id = Number(req.params.id);
    const contact = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui status" });
  }
}

// DELETE /api/contact/:id - hapus pesan (protected)
async function deleteContact(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ message: "Pesan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus pesan" });
  }
}

module.exports = { submitContact, getAllContacts, markAsRead, deleteContact };
