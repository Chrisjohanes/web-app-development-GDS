import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`${API_URL}/news/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error("Gagal mengambil data berita");
        return res.json();
      })
      .then((data) => {
        if (data) setItem(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="news-detail-page">
        <section className="news-page-header">
          <div className="news-page-container">
            <p>Memuat berita...</p>
          </div>
        </section>
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="news-detail-page">
        <section className="news-page-header">
          <div className="news-page-container">
            <h1>Berita Tidak Ditemukan</h1>
            <p>Maaf, berita yang Anda cari tidak tersedia.</p>
            <Link
              to="/news"
              className="btn-primary"
              style={{ marginTop: "20px", display: "inline-block" }}
            >
              Kembali ke Kabar Terbaru
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // body disimpan sebagai satu string di database, dipisah "\n\n" antar paragraf
  const paragraphs = item.body.split("\n\n");

  return (
    <div className="news-detail-page">
      <section className="news-detail-hero">
        <img src={item.image} alt={item.title} className="news-detail-image" />
      </section>

      <section className="news-detail-body">
        <div className="news-detail-container">
          <div>
            <Link to="/news" className="news-detail-back">
              <i className="fas fa-arrow-left"></i> Kembali ke Kabar Terbaru
            </Link>
          </div>
          <span className="news-date">{item.date}</span>
          <h1>{item.title}</h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NewsDetail;
