import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

function AdminSermonForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    preacher: "",
    date: "",
    verse: "",
    summary: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/sermons/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.title,
            preacher: data.preacher,
            date: data.date,
            verse: data.verse,
            summary: data.summary,
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
      const url = isEdit ? `${API_URL}/sermons/${id}` : `${API_URL}/sermons`;
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
        throw new Error(data.message || "Gagal menyimpan khotbah");
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
        <h1>{isEdit ? "Edit Khotbah" : "Tambah Khotbah Baru"}</h1>

        {error && <p className="admin-login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Judul Khotbah
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nama Pengkhotbah
            <input
              type="text"
              name="preacher"
              value={form.preacher}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tanggal (format bebas, misal: "20 Juni 2026")
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Ayat Alkitab
            <input
              type="text"
              name="verse"
              value={form.verse}
              onChange={handleChange}
              placeholder="misal: Filipi 4:6-7"
              required
            />
          </label>

          <label>
            Ringkasan
            <textarea
              name="summary"
              rows="6"
              value={form.summary}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <button type="submit" className="btn-primary" disabled={saving}>
            {saving
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Khotbah"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSermonForm;
