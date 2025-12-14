import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ErrandsTracker from "./components/ErrandsTracker";
import FitnessTracker from "./components/FitnessTracker";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, loading } = useContext(AuthContext);

  // ✅ prevents blank page while auth status is loading
  if (loading) {
    return (
      <div className="container mt-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      {/* Show navbar only when logged in */}
      {user && <Navbar />}

      <Routes>
        {/* Always allow login */}
        <Route path="/login" element={<Login />} />

        {/* Default route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Errands */}
        <Route
          path="/errands"
          element={
            <ProtectedRoute>
              <ErrandsTracker />
            </ProtectedRoute>
          }
        />

        {/* Fitness */}
        <Route
          path="/fitness"
          element={
            <ProtectedRoute>
              <FitnessTracker />
            </ProtectedRoute>
          }
        />

        {/* Optional: tasks route (if you later build a Tasks page) */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback: send unknown routes somewhere safe */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
