import pastorImg from "../assets/images/Ps Jesaya Henubau.jpg";

function About() {
  return (
    <div className="about-page">
      {/* Section: Sejarah / Titik Awal */}
      <section className="about-section about-history">
        <div className="about-container">
          <h2>Titik Awal GDS</h2>
          <p>
            GEKARI Damai Sejahtera (GDS) adalah salah satu gereja lokal dalam
            sinode Gereja Kasih Karunia Indonesia (GEKARI), yang dirintis oleh
            Apostle Dr. Daniel Henubau. Bermula dari sekelompok kecil jemaat,
            GDS terus bertumbuh dan berpindah tempat ibadah beberapa kali
            seiring bertambahnya jumlah jemaat.
          </p>
          <p>
            Melalui langkah iman bersama seluruh jemaat, GDS akhirnya membangun
            Wisma Bunga Kasih sebagai pusat kebangunan rohani (Revival Centre),
            yang kini menjadi tempat ibadah tetap sekaligus kantor Sinode
            GEKARI.
          </p>
        </div>
      </section>

      {/* Section: Visi Misi */}
      <section className="about-section about-vision">
        <div className="about-container">
          <h2>Visi & Misi</h2>
          <div className="vision-grid">
            <div className="vision-card">
              <h3>Diberkati untuk Memberkati</h3>
              <p>
                Setiap jemaat dipanggil untuk menerima berkat Tuhan dan
                meneruskannya kepada sesama, menjadi saluran kasih dan kebaikan
                Tuhan bagi orang lain.
              </p>
            </div>
            <div className="vision-card">
              <h3>Dilayani untuk Melayani</h3>
              <p>
                Sebagaimana jemaat dilayani dalam kasih Kristus, setiap anggota
                juga dipanggil untuk melayani sesama dengan hati yang rendah
                hati dan penuh kasih.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Gembala Kami */}
      <section className="about-section about-pastor">
        <div className="about-container about-pastor-flex">
          <img src={pastorImg} alt="Gembala GDS" className="pastor-photo" />
          <div className="pastor-info">
            <h2>Gembala Senior</h2>
            <h3>Ps Jesaya Henubau</h3>
            <p>
              Gembala Senior GEKARI Damai Sejahtera, yang telah memimpin jemaat
              dengan visi untuk membangun gereja yang penuh kasih, kuat dalam
              iman, dan menjadi berkat bagi banyak orang.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Lokasi */}
      <section className="about-section about-location">
        <div className="about-container">
          <h2>Lokasi Kami</h2>
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

export default About;
