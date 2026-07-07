import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/schedule`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data jadwal");
        return res.json();
      })
      .then((data) => {
        setScheduleData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
          {loading && <p style={{ textAlign: "center" }}>Memuat jadwal...</p>}
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>
              Gagal memuat jadwal: {error}
            </p>
          )}

          {!loading &&
            !error &&
            scheduleData.map((item) => {
              const sessions = item.sessions.split(";").map((s) => s.trim());
              return (
                <div className="schedule-detail-card" key={item.id}>
                  <div className="schedule-detail-icon">{item.icon}</div>
                  <div className="schedule-detail-content">
                    <h2>{item.title}</h2>
                    <p className="schedule-detail-desc">{item.description}</p>
                    <ul className="schedule-detail-sessions">
                      {sessions.map((session, i) => (
                        <li key={i}>{session}</li>
                      ))}
                    </ul>
                    <span className="schedule-detail-mode">{item.mode}</span>
                  </div>
                </div>
              );
            })}
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
