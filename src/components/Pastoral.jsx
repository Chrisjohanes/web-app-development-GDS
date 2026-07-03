import { Link } from "react-router-dom";

const themePhotos = [
  {
    src: "https://gds.or.id/wp-content/uploads/2025/09/pexels-raisedbyvolcanoes-4053477-scaled.jpg",
    caption: "Diberkati untuk Memberkati",
  },
  {
    src: "https://gds.or.id/wp-content/uploads/2025/10/DSC0147-2-scaled.jpg",
    caption: "Persekutuan Jemaat",
  },
  {
    src: "https://gds.or.id/wp-content/uploads/2025/10/DSC01689-1-scaled.jpg",
    caption: "Pelayanan Kasih",
  },
];

function Pastoral() {
  return (
    <section className="theme-section">
      <div className="theme-container">
        <span className="theme-eyebrow">• • •</span>
        <h2>Tema Gekari 2025</h2>
        <p className="theme-intro">
          Ada tiga hal yang akan kita pelajari untuk menjadi gereja yang
          bersepakat dengan Tuhan:{" "}
          <strong>KASIH BAPA YANG SANGAT BESAR.</strong>{" "}
          <Link to="/sermon" className="theme-more-link">
            (lebih lanjut…..)
          </Link>
        </p>

        <div className="theme-photo-grid">
          {themePhotos.map((photo, index) => (
            <div className="theme-photo-item" key={index}>
              <img src={photo.src} alt={photo.caption} />
              <span className="theme-photo-caption">{photo.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pastoral;
