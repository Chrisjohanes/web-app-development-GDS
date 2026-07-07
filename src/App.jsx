import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Schedule from "./pages/Schedule";
import Sermon from "./pages/Sermon";
import Contact from "./pages/Contact";
import NewsList from "./pages/NewsList";
import NewsDetail from "./pages/NewsDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewsForm from "./pages/AdminNewsForm";
import AdminSermonForm from "./pages/AdminSermonForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman admin TIDAK pakai Navbar/Footer publik */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/news/new"
          element={
            <ProtectedRoute>
              <AdminNewsForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/news/edit/:id"
          element={
            <ProtectedRoute>
              <AdminNewsForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sermon/new"
          element={
            <ProtectedRoute>
              <AdminSermonForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sermon/edit/:id"
          element={
            <ProtectedRoute>
              <AdminSermonForm />
            </ProtectedRoute>
          }
        />

        {/* Halaman publik, pakai Navbar/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/sermon" element={<Sermon />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/:id" element={<NewsDetail />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
