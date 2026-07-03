const sermonData = [
  {
    title: "Hidup dalam Damai Sejahtera",
    preacher: "Ps. Jesaya Henubau",
    date: "29 Juni 2026",
    verse: "Filipi 4:6-7",
    summary:
      "Damai sejahtera Tuhan melampaui akal manusia, menjaga hati dan pikiran kita dalam Kristus Yesus di tengah segala pergumulan hidup.",
  },
  {
    title: "Kasih yang Memulihkan",
    preacher: "Ps. Debora Henubau",
    date: "22 Juni 2026",
    verse: "1 Korintus 13:4-8",
    summary:
      "Kasih Kristus adalah kasih yang sabar dan memulihkan, mengajarkan kita untuk mengasihi tanpa syarat seperti yang Tuhan sudah lakukan bagi kita.",
  },
  {
    title: "Iman yang Bertumbuh",
    preacher: "Ps. Samuel V. Bernard",
    date: "15 Juni 2026",
    verse: "Ibrani 11:1",
    summary:
      "Iman adalah dasar dari segala sesuatu yang kita harapkan, dan bukti dari segala sesuatu yang tidak kita lihat — iman bertumbuh melalui firman Tuhan.",
  },
  {
    title: "Bersukacita dalam Segala Keadaan",
    preacher: "Ps. Dina Henubau",
    date: "8 Juni 2026",
    verse: "Filipi 4:4",
    summary:
      "Sukacita sejati tidak bergantung pada keadaan, melainkan pada pengenalan akan Tuhan yang selalu menyertai kita setiap waktu.",
  },
];

function Sermon() {
  return (
    <div className="sermon-page">
      <section className="sermon-page-header">
        <div className="sermon-page-container">
          <h1>Ringkasan Khotbah</h1>
          <p>
            Kumpulan renungan dan pengajaran firman Tuhan dari ibadah-ibadah
            kami setiap minggunya.
          </p>
        </div>
      </section>

      <section className="sermon-page-list">
        <div className="sermon-page-container">
          {sermonData.map((item, index) => (
            <article className="sermon-detail-card" key={index}>
              <div className="sermon-detail-header">
                <h2>{item.title}</h2>
                <span className="sermon-detail-verse">{item.verse}</span>
              </div>
              <p className="sermon-detail-meta">
                {item.preacher} • {item.date}
              </p>
              <p className="sermon-detail-summary">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Sermon;
