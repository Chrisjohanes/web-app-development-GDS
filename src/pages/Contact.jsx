import { useState } from "react";

const API_URL = "http://localhost:5000/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengirim pesan");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-page-header">
        <div className="contact-page-container">
          <h1>Hubungi Kami</h1>
          <p>
            Kami senang mendengar dari Anda. Silakan gunakan formulir di bawah
            ini, atau hubungi kami langsung melalui informasi kontak yang
            tersedia.
          </p>
        </div>
      </section>

      <section className="contact-page-body">
        <div className="contact-page-container contact-grid">
          <div className="contact-form-wrapper">
            <h2>Kirim Pesan</h2>
            {submitted && (
              <p className="contact-success">
                Terima kasih! Pesan Anda telah terkirim.
              </p>
            )}
            {error && <p className="admin-login-error">{error}</p>}
            <form onSubmit={handleSubmit} className="contact-form">
              <label>
                Nama
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Pesan
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>

          <div className="contact-info-wrapper">
            <h2>Informasi Kontak</h2>
            <div className="contact-info-item">
              <strong>Alamat</strong>
              <p>
                GEKARI Revival Centre
                <br />
                Jl. Boulevard Bukit Gading Raya No.7
                <br />
                Kelapa Gading, Jakarta Utara
              </p>
            </div>
            <div className="contact-info-item">
              <strong>Telepon</strong>
              <p>+62 21 4528360</p>
            </div>
            <div className="contact-info-item">
              <strong>Email</strong>
              <p>kontak@gds.or.id</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
