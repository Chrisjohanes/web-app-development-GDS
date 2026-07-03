import { useParams, Link } from "react-router-dom";
import { newsData } from "../data/newsData";

function NewsDetail() {
  const { id } = useParams();
  const item = newsData.find((n) => n.id === Number(id));

  if (!item) {
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
          {item.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NewsDetail;
