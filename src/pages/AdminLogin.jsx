import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      setToken(data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <h1>Login Admin</h1>
        <p>GEKARI Damai Sejahtera - Panel Pengelolaan Konten</p>

        {error && <p className="admin-login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
