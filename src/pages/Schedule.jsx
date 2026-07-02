const scheduleData = [
  {
    title: "Ibadah Anak",
    icon: "🧒",
    sessions: ["Minggu, 09.00 WIB", "Minggu, 13.00 WIB"],
    mode: "Onsite",
    desc: "Ibadah khusus untuk anak-anak dengan pujian, cerita Alkitab, dan aktivitas yang menyenangkan.",
  },
  {
    title: "Ibadah Youth",
    icon: "🧒",
    sessions: ["Sabtu, 17.00 WIB"],
    mode: "Onsite",
    desc: "Ibadah untuk remaja & anak muda, penuh semangat dengan pujian dan pengajaran firman yang relevan.",
  },
  {
    title: "Ibadah Dewasa",
    icon: "🙏",
    sessions: ["Minggu, 09.00 WIB", "Minggu, 13.00 WIB"],
    mode: "Onsite & Online",
    desc: "Ibadah umum untuk seluruh jemaat dewasa, tersedia juga live streaming bagi yang berhalangan hadir.",
  },
];

function Schedule() {
  return (
    <div className="schedule-page">
      <section className="schedule-page-header">
        <div className="schedule-page-container">
          <h1>Jadwal Ibadah</h1>
          <p>
            Bergabunglah dalam ibadah dan pelayanan kami setiap minggunya, baik
            secara onsite maupun online.
          </p>
        </div>
      </section>

      <section className="schedule-page-list">
        <div className="schedule-page-container">
          {scheduleData.map((item, index) => (
            <div className="schedule-detail-card" key={index}>
              <div className="schedule-detail-icon">{item.icon}</div>
              <div className="schedule-detail-content">
                <h2>{item.title}</h2>
                <p className="schedule-detail-desc">{item.desc}</p>
                <ul className="schedule-detail-sessions">
                  {item.sessions.map((session, i) => (
                    <li key={i}>{session}</li>
                  ))}
                </ul>
                <span className="schedule-detail-mode">{item.mode}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="schedule-page-location">
        <div className="schedule-page-container">
          <h2>Lokasi Ibadah</h2>
          <p>
            GEKARI Revival Centre
            <br />
            Jl. Boulevard Bukit Gading Raya No.7, Kelapa Gading, Jakarta Utara
          </p>
        </div>
      </section>
    </div>
  );
}

export default Schedule;
