
import { useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import SensorConnection from "./pages/onboarding/SensorConnection";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Splash from "./pages/Splash";
import Landing from "./pages/Landing";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";

import OnboardingHub from "./pages/onboarding/OnboardingHub";
import FarmerInformation from "./pages/onboarding/FarmerInformation";
import FieldInformation from "./pages/onboarding/FieldInformation";
import LocationInformation from "./pages/onboarding/LocationInformation";

import { LanguageProvider } from "./context/LanguageContext";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function AppRoutes() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("dhara_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("dhara_token");
    localStorage.removeItem("dhara_user");
    setUser(null);
    navigate("/signin", { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Splash
            onComplete={() => navigate("/home", { replace: true })}
          />
        }
      />

      <Route
        path="/home"
        element={
          <Landing
            onAuth={(type) =>
              navigate(type === "signup" ? "/signup" : "/signin")
            }
          />
        }
      />

      <Route
        path="/signin"
        element={
          user ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <SignIn onAuthenticated={handleAuthenticated} />
          )
        }
      />

      <Route
        path="/signup"
        element={
          user ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <SignUp onAuthenticated={handleAuthenticated} />
          )
        }
      />

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute user={user}>
            <OnboardingHub user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding/farmer"
        element={
          <ProtectedRoute user={user}>
            <FarmerInformation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding/field"
        element={
          <ProtectedRoute user={user}>
            <FieldInformation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding/location"
        element={
          <ProtectedRoute user={user}>
            <LocationInformation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/onboarding/sensors"
        element={
          <ProtectedRoute user={user}>
            <SensorConnection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
