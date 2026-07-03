import { Link } from "react-router-dom";
import { newsData } from "../data/newsData";

function NewsList() {
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
        </div>
      </section>
    </div>
  );
}

export default NewsList;
