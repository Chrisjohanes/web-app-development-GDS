import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import newYearImg from "../assets/images/newyear2026.png";
import pesanGembalaImg from "../assets/images/Pesan dari Gembala.png";

const slides = [
  {
    bg: "linear-gradient(135deg, #0b4f2c 0%, #15653c 40%, #093d22 100%)",
    image: newYearImg,
    title: "Selamat Tahun Baru 2026",
    quote: `"Tuhan memberkati engkau dan melindungi engkau; Tuhan menyinari engkau dengan wajah-Nya dan memberi engkau kasih karunia." (Bilangan 6:24-25)`,
    link: "/about",
    linkText: "Lebih Lanjut",
  },
  {
    bg: "linear-gradient(135deg, #15653c 0%, #0b4f2c 50%, #093d22 100%)",
    image: pesanGembalaImg,
    title: "Pesan dari Gembala",
    quote:
      "Tetaplah setia dalam iman dan pelayanan. Tuhan senantiasa menyertai langkah kita.",
  },
  {
    bg: "linear-gradient(135deg, #093d22 0%, #0b4f2c 40%, #15653c 100%)",
    title: "Rev. Thomas Cherian",
    isSpeaker: true,
    quote: `"Tuhan akan memberikan mujizat-Nya hari ini bagi setiap keluarga yang menantikan jawaban-Nya, di dalam nama Tuhan Yesus!"`,
    speaker: "Rev. Thomas Cherian",
    role: "Pelayan Firman Tuhan",
  },
  {
    bg: "linear-gradient(135deg, #15653c 0%, #0b4f2c 50%, #093d22 100%)",
    title: "Mrs. Miranda Nelson",
    isSpeaker: true,
    quote: `"Saya melihat dalam penglihatan bagaimana penyembahan jemaat begitu menyenangkan hati Tuhan."`,
    speaker: "Mrs. Miranda Nelson",
    role: "Pelayan Firman Tuhan",
  },
  {
    bg: "linear-gradient(135deg, #0b4f2c 0%, #1a7a45 50%, #093d22 100%)",
    title: "Rev. Jerame Nelson",
    isSpeaker: true,
    quote: `"Ketika kemuliaan Tuhan hadir saat kita menyembah dalam Roh dan kebenaran, kita menarik hadirat dan pengurapan-Nya."`,
    speaker: "Rev. Jerame Nelson",
    role: "Pelayan Firman Tuhan",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [height, setHeight] = useState(460);
  const contentRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activeContent = contentRefs.current[current];
    if (activeContent) {
      // Beri sedikit padding ekstra atas-bawah supaya konten tidak mepet
      setHeight(activeContent.offsetHeight + 80);
    }
  }, [current]);

  const goTo = (index) => setCurrent(index);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((current + 1) % slides.length);

  return (
    <section className="hero" id="beranda">
      <div className="carousel" style={{ height: `${height}px` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === current ? "active" : ""}`}
            style={{ background: slide.bg }}
          >
            <div
              className="slide-content"
              ref={(el) => (contentRefs.current[index] = el)}
            >
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    width: "100%",
                    maxWidth: "750px",
                    height: "auto",
                    borderRadius: "16px",
                    marginBottom: "20px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                />
              )}
              <h2>{slide.isSpeaker ? <em>{slide.title}</em> : slide.title}</h2>
              <p className="slide-quote">{slide.quote}</p>
              {slide.isSpeaker && (
                <div className="slide-speaker">
                  <div className="speaker-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="speaker-info">
                    <strong>{slide.speaker}</strong>
                    <span>{slide.role}</span>
                  </div>
                </div>
              )}
              {slide.link && (
                <Link to={slide.link} className="btn-primary">
                  {slide.linkText}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-nav-btn carousel-prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        className="carousel-nav-btn carousel-next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === current ? "active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
