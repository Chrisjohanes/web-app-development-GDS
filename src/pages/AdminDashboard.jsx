import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const [newsData, setNewsData] = useState([]);
  const [sermonData, setSermonData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/news`).then((res) => res.json()),
      fetch(`${API_URL}/sermons`).then((res) => res.json()),
      fetch(`${API_URL}/contact`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }).then((res) => res.json()),
      fetch(`${API_URL}/schedule`).then((res) => res.json()),
    ])
      .then(([news, sermons, contacts, schedules]) => {
        setNewsData(news);
        setSermonData(sermons);
        setContactData(Array.isArray(contacts) ? contacts : []);
        setScheduleData(schedules);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/admin/login");
  };

  const handleDeleteNews = async (id, title) => {
    if (
      !window.confirm(
        `Hapus berita "${title}"? Aksi ini tidak bisa dibatalkan.`,
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      loadData();
    } catch (err) {
      alert("Gagal menghapus berita: " + err.message);
    }
  };

  const handleDeleteSermon = async (id, title) => {
    if (
      !window.confirm(
        `Hapus khotbah "${title}"? Aksi ini tidak bisa dibatalkan.`,
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/sermons/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      loadData();
    } catch (err) {
      alert("Gagal menghapus khotbah: " + err.message);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await fetch(`${API_URL}/contact/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      loadData();
    } catch (err) {
      alert("Gagal memperbarui status: " + err.message);
    }
  };

  const handleDeleteContact = async (id, name) => {
    if (
      !window.confirm(
        `Hapus pesan dari "${name}"? Aksi ini tidak bisa dibatalkan.`,
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      loadData();
    } catch (err) {
      alert("Gagal menghapus pesan: " + err.message);
    }
  };

  const handleDeleteSchedule = async (id, title) => {
    if (
      !window.confirm(
        `Hapus jadwal "${title}"? Aksi ini tidak bisa dibatalkan.`,
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/schedule/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      loadData();
    } catch (err) {
      alert("Gagal menghapus jadwal: " + err.message);
    }
  };

  const unreadCount = contactData.filter((c) => !c.isRead).length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel Admin GDS</h1>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === "news" ? "active" : ""}`}
          onClick={() => setActiveTab("news")}
        >
          Kabar Terbaru ({newsData.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "sermon" ? "active" : ""}`}
          onClick={() => setActiveTab("sermon")}
        >
          Khotbah ({sermonData.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          Jadwal ({scheduleData.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          Pesan Masuk ({contactData.length})
          {unreadCount > 0 ? ` — ${unreadCount} baru` : ""}
        </button>
      </div>

      {loading && <p className="admin-loading">Memuat data...</p>}

      {!loading && activeTab === "news" && (
        <div className="admin-panel">
          <div className="admin-panel-toolbar">
            <Link to="/admin/news/new" className="btn-primary">
              + Tambah Berita
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {newsData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td className="admin-table-actions">
                    <Link
                      to={`/admin/news/edit/${item.id}`}
                      className="admin-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteNews(item.id, item.title)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {newsData.length === 0 && (
                <tr>
                  <td colSpan="3">Belum ada berita.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && activeTab === "sermon" && (
        <div className="admin-panel">
          <div className="admin-panel-toolbar">
            <Link to="/admin/sermon/new" className="btn-primary">
              + Tambah Khotbah
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Pengkhotbah</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sermonData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.preacher}</td>
                  <td>{item.date}</td>
                  <td className="admin-table-actions">
                    <Link
                      to={`/admin/sermon/edit/${item.id}`}
                      className="admin-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteSermon(item.id, item.title)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {sermonData.length === 0 && (
                <tr>
                  <td colSpan="4">Belum ada khotbah.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && activeTab === "schedule" && (
        <div className="admin-panel">
          <div className="admin-panel-toolbar">
            <Link to="/admin/schedule/new" className="btn-primary">
              + Tambah Jadwal
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Sesi</th>
                <th>Mode</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.icon} {item.title}
                  </td>
                  <td>{item.sessions.split(";").join(", ")}</td>
                  <td>{item.mode}</td>
                  <td className="admin-table-actions">
                    <Link
                      to={`/admin/schedule/edit/${item.id}`}
                      className="admin-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteSchedule(item.id, item.title)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {scheduleData.length === 0 && (
                <tr>
                  <td colSpan="4">Belum ada jadwal.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && activeTab === "contact" && (
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Pesan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((item) => (
                <tr
                  key={item.id}
                  style={{ background: item.isRead ? "white" : "#f0f9f0" }}
                >
                  <td>{item.isRead ? "Dibaca" : "Baru"}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                    {item.message}
                  </td>
                  <td className="admin-table-actions">
                    {!item.isRead && (
                      <button
                        className="admin-edit-btn"
                        style={{ border: "none", cursor: "pointer" }}
                        onClick={() => handleMarkRead(item.id)}
                      >
                        Tandai Dibaca
                      </button>
                    )}
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDeleteContact(item.id, item.name)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {contactData.length === 0 && (
                <tr>
                  <td colSpan="5">Belum ada pesan masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
