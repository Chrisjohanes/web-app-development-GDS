const newsData = [
  {
    title: "Retreat Remaja 2026",
    date: "15 Juni 2026",
    excerpt:
      "Ikuti retreat remaja tahun ini dengan tema 'Bangkit dan Bersinar', membangun iman generasi muda.",
    image: null,
  },
  {
    title: "Baksos Kasih untuk Sesama",
    date: "2 Mei 2026",
    excerpt:
      "Jemaat GDS mengadakan bakti sosial untuk membantu warga sekitar yang membutuhkan.",
    image: null,
  },
  {
    title: "Pembukaan Kelas Alkitab Baru",
    date: "20 April 2026",
    excerpt:
      "Kelas pemuridan Alkitab dasar akan dibuka setiap Sabtu sore, terbuka untuk seluruh jemaat.",
    image: null,
  },
];

function News() {
  return (
    <section className="news" id="news">
      <div className="news-container">
        <h2>Kabar Terbaru</h2>
        <p>Informasi dan kegiatan terbaru dari GEKARI Damai Sejahtera</p>
        <div className="news-grid">
          {newsData.map((item, index) => (
            <article className="news-card" key={index}>
              <div className="news-image-placeholder"></div>
              <div className="news-content">
                <span className="news-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;
