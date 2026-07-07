import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function NewsList() {
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
        setNewsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="news-page">
      <section className="news-page-header">
        <div className="news-page-container">
          <h1>Kabar Terbaru</h1>
          <p>
            Kumpulan informasi dan kegiatan dari GEKARI Damai Sejahtera Jakarta.
          </p>
        </div>
      </section>

      <section className="news-page-list">
        <div className="news-page-container">
          {loading && <p style={{ textAlign: "center" }}>Memuat berita...</p>}
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>
              Gagal memuat berita: {error}
            </p>
          )}

          {!loading && !error && (
            <div className="news-grid">
              {newsData.map((item) => (
                <Link
                  to={`/news/${item.id}`}
                  className="news-card"
                  key={item.id}
                >
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
        </div>
      </section>
    </div>
  );
}

export default NewsList;
