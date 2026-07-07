import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

function AdminNewsForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    excerpt: "",
    body: "",
    image: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/news/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            body: data.body,
            image: data.image,
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
      const url = isEdit ? `${API_URL}/news/${id}` : `${API_URL}/news`;
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
        throw new Error(data.message || "Gagal menyimpan berita");
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
        <h1>{isEdit ? "Edit Berita" : "Tambah Berita Baru"}</h1>

        {error && <p className="admin-login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Judul
            <input
              type="text"
              name="title"
              value={form.title}
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
            URL Gambar
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </label>

          <label>
            Ringkasan Singkat (muncul di card preview)
            <textarea
              name="excerpt"
              rows="3"
              value={form.excerpt}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <label>
            Isi Lengkap (pisahkan paragraf dengan baris kosong)
            <textarea
              name="body"
              rows="10"
              value={form.body}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <button type="submit" className="btn-primary" disabled={saving}>
            {saving
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Berita"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminNewsForm;
