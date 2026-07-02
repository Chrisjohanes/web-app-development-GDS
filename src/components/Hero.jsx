import newYearImg from "../assets/images/newyear2026.png";

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-slide">
        <img src={newYearImg} alt="Selamat Tahun Baru 2026" />
        <div className="hero-content">
          <h1>Selamat Tahun Baru 2026</h1>
          <p>Tuhan memberkati engkau dan melindungi engkau</p>
          <a href="#schedule" className="btn-primary">
            Lihat Jadwal Ibadah
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
