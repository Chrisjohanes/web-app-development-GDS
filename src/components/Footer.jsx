function Footer() {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
        background: "#111",
        color: "#aaa",
      }}
    >
      <p>&copy; {new Date().getFullYear()} GDS Church. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
