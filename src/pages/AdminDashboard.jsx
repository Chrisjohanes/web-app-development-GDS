import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const [newsData, setNewsData] = useState([]);
  const [sermonData, setSermonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/news`).then((res) => res.json()),
      fetch(`${API_URL}/sermons`).then((res) => res.json()),
    ])
      .then(([news, sermons]) => {
        setNewsData(news);
        setSermonData(sermons);
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
    </div>
  );
}

export default AdminDashboard;
