import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setScheduleData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="schedule" id="schedule">
      <div className="schedule-container">
        <h2>Jadwal Pelayanan</h2>
        <p>
          Bergabunglah dengan kami dalam ibadah dan pelayanan setiap minggunya
        </p>

        {loading && <p>Memuat jadwal...</p>}

        {!loading && (
          <div className="schedule-grid">
            {scheduleData.map((item) => (
              <div className="schedule-card" key={item.id}>
                <div className="schedule-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="schedule-time">
                  {item.sessions.split(";")[0].trim()}
                </p>
                <span className="schedule-mode">{item.mode}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/schedule" className="btn-primary">
            Lihat Jadwal Lengkap
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
