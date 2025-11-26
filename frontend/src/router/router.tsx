import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

// Layout
import SideBar from "../layouts/SideBar";

// Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ListingsPage from "../pages/listings/ListingsPage";
import BookingPage from "../pages/booking/BookingPage";
import NotFound from "../pages/NotFound";
import type { JSX } from "react";

// Protected route component
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <Router>
      <AppContent />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Rutas donde NO se muestra el sidebar
  const hideSidebarRoutes = ["/login", "/register"];
  const shouldHideSidebar = hideSidebarRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="flex min-h-screen">
      {token && !shouldHideSidebar && <SideBar />}

      <main className="flex-1">
        <Routes>
          {/* Redirigir root -> login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard / Home */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Listings */}
          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <ListingsPage />
              </ProtectedRoute>
            }
          />

          {/* Booking */}
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
