const scheduleData = [
  {
    title: "Anak",
    time: "Minggu, 09.00 & 14.00 WIB",
    mode: "Onsite",
    icon: "🧒",
  },
  {
    title: "Youth",
    time: "Sabtu, 17.00 WIB",
    mode: "Onsite",
    icon: "🎸",
  },
  {
    title: "Dewasa",
    time: "Minggu, 09.00 & 14.00 WIB",
    mode: "Onsite & Online",
    icon: "🙏",
  },
];

function Schedule() {
  return (
    <section className="schedule" id="schedule">
      <div className="schedule-container">
        <h2>Jadwal Pelayanan</h2>
        <p>
          Bergabunglah dengan kami dalam ibadah dan pelayanan setiap minggunya
        </p>
        <div className="schedule-grid">
          {scheduleData.map((item, index) => (
            <div className="schedule-card" key={index}>
              <div className="schedule-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p className="schedule-time">{item.time}</p>
              <span className="schedule-mode">{item.mode}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
