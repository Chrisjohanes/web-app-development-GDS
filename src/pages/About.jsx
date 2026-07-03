import { useState } from "react";
import pastorImg from "../assets/images/Ps Jesaya Henubau.jpg";
import dinaImg from "../assets/images/ps-dina-h.png";
import deboraImg from "../assets/images/Ps. Debora Henubau.jpeg";
import samuelImg from "../assets/images/Ps. Samuel V. Bernard 2.jpeg";

const pastoralTeam = [
  { img: pastorImg, name: "Ps. Jesaya Henubau", role: "Gembala Senior" },
  { img: dinaImg, name: "Ps. Dina Henubau", role: "Tim Gembala" },
  { img: deboraImg, name: "Ps. Debora Henubau", role: "Tim Gembala" },
  { img: samuelImg, name: "Ps. Samuel V. Bernard", role: "Youth Pastor" },
];

const visiMisi = [
  {
    title: "Dibaharui untuk Bersekutu",
    desc: "Renewed to Fellowship — Bertumbuh dalam persekutuan yang hidup",
  },
  {
    title: "Diberkati untuk Memberkati",
    desc: "Blessed to Bless — Menjadi saluran berkat bagi sesama",
  },
  {
    title: "Dilayani untuk Melayani",
    desc: "Served to Serve — Melayani dengan kasih dan kuasa Roh Kudus",
  },
];

function About() {
  const [activeTab, setActiveTab] = useState("titikAwal");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="about-page">
      <section className="about-section-main">
        <div className="container">
          <div className="section-title">
            <h2>Tentang Kami</h2>
            <p>Mengenal lebih dekat GEKARI Damai Sejahtera Jakarta</p>
            <div className="title-line"></div>
          </div>

          {/* Tab Navigation */}
          <div className="about-subnav">
            <button
              className={`about-nav-btn ${activeTab === "titikAwal" ? "active" : ""}`}
              onClick={() => setActiveTab("titikAwal")}
            >
              Titik Awal GDS
            </button>
            <button
              className={`about-nav-btn ${activeTab === "visiMisi" ? "active" : ""}`}
              onClick={() => setActiveTab("visiMisi")}
            >
              Visi Misi GDS
            </button>
            <button
              className={`about-nav-btn ${activeTab === "gembalaKami" ? "active" : ""}`}
              onClick={() => setActiveTab("gembalaKami")}
            >
              Tim Gembala
            </button>
          </div>

          {/* Panel: Titik Awal GDS */}
          {activeTab === "titikAwal" && (
            <div className="about-panel">
              <div className="about-story">
                <div className="about-story-header">
                  <i className="fas fa-church"></i>
                  <h3>Titik Awal GDS</h3>
                  <p>Sejarah & Perjalanan GEKARI Damai Sejahtera Jakarta</p>
                </div>
                <div className="about-story-box">
                  <p>
                    Gereja GEKARI Damai Sejahtera Jakarta adalah salah satu
                    gereja lokal dalam sinode Gereja Kasih Karunia Indonesia
                    (GEKARI). Didirikan pada <strong>3 Maret 1996</strong>{" "}
                    melalui pergumulan doa dan puasa.
                  </p>
                  <p>
                    Sejak saat itu, Tuhan terus memberkati dan menumbuhkan
                    jemaat ini hingga memiliki gedung ibadah sendiri yaitu{" "}
                    <strong>GEKARI Revival Center</strong> di Kelapa Gading,
                    Jakarta Utara.
                  </p>
                  <div className="verse">
                    "Dan dengan kuasa yang besar rasul-rasul memberi kesaksian
                    tentang kebangkitan Tuhan Yesus dan mereka semua hidup dalam
                    kasih karunia yang melimpah-limpah." (Kisah Para Rasul 4:33)
                  </div>
                  <div style={{ textAlign: "center", marginTop: "28px" }}>
                    <button
                      className="btn-primary"
                      onClick={() => setModalOpen(true)}
                    >
                      <i className="fas fa-book-open"></i> Baca Selengkapnya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Panel: Visi Misi */}
          {activeTab === "visiMisi" && (
            <div className="about-panel">
              <div className="visi-misi-content">
                <div className="about-story-header">
                  <i className="fas fa-compass"></i>
                  <h3>Visi & Misi GDS</h3>
                </div>
                <div className="visi-misi-grid">
                  {visiMisi.map((item, index) => (
                    <div className="visi-card" key={index}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Panel: Tim Gembala */}
          {activeTab === "gembalaKami" && (
            <div className="about-panel">
              <div className="pastoral-grid">
                {pastoralTeam.map((person, index) => (
                  <div className="pastoral-card" key={index}>
                    <div className="pastoral-photo">
                      <img src={person.img} alt={person.name} />
                    </div>
                    <h3>{person.name}</h3>
                    <span className="pastoral-role">{person.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal Sejarah Lengkap */}
      {modalOpen && (
        <div
          className="news-modal-overlay show"
          onClick={() => setModalOpen(false)}
        >
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <div className="news-modal-header">
              <button
                className="news-modal-close"
                onClick={() => setModalOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="news-modal-icon">
                <i className="fas fa-church"></i>
              </div>
              <div className="news-modal-date">Sejarah GDS</div>
              <h2>Titik Awal GEKARI Damai Sejahtera</h2>
            </div>
            <div className="news-modal-body">
              <div className="verse">
                "Dan dengan kuasa yang besar rasul-rasul memberi kesaksian
                tentang kebangkitan Tuhan Yesus dan mereka semua hidup dalam
                kasih karunia yang melimpah-limpah." (Kisah Para Rasul 4:33)
              </div>

              <h4 style={{ color: "var(--green-dark)", margin: "24px 0 12px" }}>
                🏛️ GEREJA GEKARI DAMAI SEJAHTERA JAKARTA
              </h4>

              <p>
                Adalah salah satu gereja lokal dalam sinode Gereja Kasih Karunia
                Indonesia (GEKARI). Belasan tahun lalu, berulangkali{" "}
                <strong>Apostle Dr. Daniel Henubau</strong> mendapat pesan Tuhan
                memberi pengertian akan datang guncangan-guncangan dahsyat
                melanda dunia di semua bidang kehidupan manusia. Rumah tangga
                atau keluarga, dimana perzinahan, pemberontakan anak terhadap
                orang tua, pertengkaran antara anggota keluarga bahkan
                perceraian seolah-olah menjadi bagian kehidupan manusia karena
                manusia menempatkan pekerjaan, bisnis, hobi, uang dan kesenangan
                pribadi lebih utama daripada Allah Penciptanya.
              </p>

              <p>
                Manusia tidak punya waktu untuk beribadah kepada Allah dalam
                doa, pujian dan membaca Alkitab. Akibatnya manusia diikat hawa
                nafsu, keserakahan, materialisme, kehampaan dan kegelisahan
                hidup.
              </p>

              <p>
                Setelah sharing kepada pimpinan Sinode, diadakanlah Retret pada{" "}
                <strong>10, 23–25 Februari 1996</strong> di Vila Bango,
                Cilember, dihadiri antara lain Bapak Martin Irawan dan Ibu Mega
                Purnama, Bapak Suwinto (alm) dan Ibu Bong Ai Tjoe.
              </p>

              <div className="verse">
                "Melalui pergumulan doa dan puasa dalam Retret disepakati
                mendirikan satu jemaat lagi dijajaran GEKARI dengan nama Jemaat
                Damai Sejahtera (GDS)"
              </div>

              <p>
                Kebaktian perdana diadakan pada <strong>3 Maret 1996</strong> di
                restoran Kanvas 2000 dan jemaat ini ditahbiskan pada{" "}
                <strong>17 Maret 1996</strong> di Hotel Century.
              </p>

              <p>
                Pada tahun itu juga, tepatnya <strong>5 Mei</strong>, GDS harus
                pindah ke tempat yang lebih besar di gedung Wijoyo Center di
                Jalan Sudirman. Karena pertumbuhan yang pesat, GDS sekali lagi
                harus pindah ke tempat yang lebih besar. Maka sejak{" "}
                <strong>22 Maret 1998</strong>, GDS mulai beribadah di Hotel
                Santika KS Tubun.
              </p>

              <p>
                Bulan <strong>Maret 1998</strong>, Tuhan berbicara kepada
                Gembala Senior, <strong>Apostle Dr. Daniel Henubau</strong> dari{" "}
                <strong>2 Raja-raja 3:4</strong> yang memberi visi dan iman
                untuk mempunyai gedung ibadah lebih besar.
              </p>

              <p>
                Maka Gembala Senior bersama seluruh pengurus dan jemaat
                bersehati, berdoa dan mengambil langkah iman untuk menyiapkan
                suatu tempat ibadah yang lebih besar. Tuhan menjawab doa. Dia
                berkenan memakai keluarga anak Tuhan yang cinta Tuhan dan dengan
                dukungan seluruh jemaat membangun{" "}
                <strong>Wisma Bunga Kasih</strong> sebagai tempat ibadah atau
                revival center, sekaligus untuk kantor Sinode dan kantor GDS.
              </p>

              <p>
                Gedung Wisma Bunga Kasih atau Revival Center mulai direncanakan
                dan dibangun tepat pada waktu memasuki masa krisis moneter
                Indonesia tahun 1998 dan pembangunan fisik gedung dimulai pada
                tahun 2000.
              </p>

              <p>
                Sekali lagi Tuhan membuat mujizat, dan menunjukkan kuasa-Nya,
                seluruh pembangunan gedung dapat selesai sesuai dengan rencana.
                Maka setelah 5 tahun berpindah-pindah tempat ibadah, dari hotel
                ke hotel, maka tanggal <strong>21 Oktober 2001</strong>, gedung
                Wisma Bunga Kasih atau <strong>GEKARI Revival Center</strong>{" "}
                diresmikan.
              </p>

              <div className="modal-highlight-box">
                <i className="fas fa-church"></i>
                <p>
                  Terima kasih Tuhan atas perjalanan iman GDS dari awal hingga
                  saat ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
