import { Link } from "react-router-dom";
import { newsData } from "../data/newsData";

function News() {
  const previewData = newsData.slice(0, 4);

  return (
    <section className="news" id="news">
      <div className="news-container">
        <div className="section-title">
          <h2>Kabar Terbaru</h2>
          <p>Informasi dan kegiatan terbaru dari GEKARI Damai Sejahtera</p>
          <div className="title-line"></div>
        </div>
        <div className="news-grid">
          {previewData.map((item) => (
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
