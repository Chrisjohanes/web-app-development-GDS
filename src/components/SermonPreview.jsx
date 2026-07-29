const sermonData = [
  {
    title: "Hidup dalam Damai Sejahtera",
    preacher: "Ps. Jesaya Henubau",
    date: "29 Juni 2026",
    verse: "Filipi 4:6-7",
  },
  {
    title: "Kasih yang Memulihkan",
    preacher: "Ps. Debora Henubau",
    date: "22 Juni 2026",
    verse: "1 Korintus 13:4-8",
  },
  {
    title: "Iman yang Bertumbuh",
    preacher: "Ps. Samuel V. Bernard",
    date: "15 Juni 2026",
    verse: "Ibrani 11:1",
  },
];

function SermonPreview() {
  return (
    <section className="sermon-preview" id="sermon">
      <div className="sermon-preview-container">
        <h2>Ringkasan Khotbah</h2>
        <p>Renungan dan pengajaran firman Tuhan dari minggu-minggu terakhir</p>
        <div className="sermon-list">
          {sermonData.map((item, index) => (
            <div className="sermon-item" key={index}>
              <div className="sermon-info">
                <h3>{item.title}</h3>
                <p className="sermon-meta">
                  {item.preacher} • {item.date}
                </p>
                <span className="sermon-verse">{item.verse}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SermonPreview;
