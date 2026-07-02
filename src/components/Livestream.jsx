function LiveStream() {
  return (
    <section className="livestream">
      <div className="livestream-container">
        <h2>Ibadah Live Streaming</h2>
        <p>Ikuti ibadah minggu kami secara online melalui YouTube</p>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/live_stream?channel=UC5Wpnoh80rtOaOVOLw2sdJQ"
            title="GDS Live Streaming"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default LiveStream;
