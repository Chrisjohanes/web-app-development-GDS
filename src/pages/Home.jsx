import Hero from "../components/Hero";
import Pastoral from "../components/Pastoral";
import LiveStream from "../components/LiveStream";
import Schedule from "../components/Schedule";
import News from "../components/News";
import SermonPreview from "../components/SermonPreview";

function Home() {
  return (
    <div>
      <Hero />
      <Pastoral />
      <LiveStream />
      <Schedule />
      <News />
      <SermonPreview />
    </div>
  );
}

export default Home;
