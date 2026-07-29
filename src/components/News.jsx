import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data berita");
        return res.json();
      })
      .then((data) => {
        setNewsData(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="news" id="news">
      <div className="news-container">
        <div className="section-title">
          <h2>Kabar Terbaru</h2>
          <p>Informasi dan kegiatan terbaru dari GEKARI Damai Sejahtera</p>
          <div className="title-line"></div>
        </div>

        {loading && <p style={{ textAlign: "center" }}>Memuat berita...</p>}
        {error && (
          <p style={{ textAlign: "center", color: "red" }}>
            Gagal memuat berita: {error}
          </p>
        )}

        {!loading && !error && (
          <div className="news-grid">
            {newsData.map((item) => (
              <Link to={`/news/${item.id}`} className="news-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-card-image"
                />
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/news" className="btn-primary">
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </section>
  );
}

export default News;
