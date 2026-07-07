import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

function AdminScheduleForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    icon: "",
    sessions: "",
    mode: "",
    description: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/schedule/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.title,
            icon: data.icon,
            sessions: data.sessions,
            mode: data.mode,
            description: data.description,
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = isEdit ? `${API_URL}/schedule/${id}` : `${API_URL}/schedule`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan jadwal");
      }

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="admin-loading">Memuat data...</p>;

  return (
    <div className="admin-form-page">
      <div className="admin-form-container">
        <Link to="/admin" className="admin-back-link">
          ← Kembali ke Dashboard
        </Link>
        <h1>{isEdit ? "Edit Jadwal" : "Tambah Jadwal Baru"}</h1>

        {error && <p className="admin-login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Judul (misal: Ibadah Anak)
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Icon Emoji (misal: 🧒)
            <input
              type="text"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="Copy-paste emoji dari keyboard/emoji picker"
              required
            />
          </label>

          <label>
            Jadwal Sesi (pisahkan tiap sesi dengan titik-koma ; )
            <input
              type="text"
              name="sessions"
              value={form.sessions}
              onChange={handleChange}
              placeholder="Minggu, 09.00 WIB;Minggu, 14.00 WIB"
              required
            />
          </label>

          <label>
            Mode (Onsite / Online / Onsite & Online)
            <input
              type="text"
              name="mode"
              value={form.mode}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Deskripsi
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <button type="submit" className="btn-primary" disabled={saving}>
            {saving
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Jadwal"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminScheduleForm;
