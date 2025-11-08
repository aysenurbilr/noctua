import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardScreen from "./pages/DashboardScreen";
import CasesScreen from "./pages/CasesScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import AiAsistanScreen from "./pages/AiAsistanScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ForgotPassword from "./pages/ForgotPassword";
import SettingsPage from "./pages/SettingsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotesPage from "./pages/NotesPage";
import ForumPage from "./pages/ForumPage";
import NotificationsPage from "./pages/NotificationPage";

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Giriş sayfaları (Layout dışında) */}
      <Route
        path="/login"
        element={
          <LoginScreen
            onLoginSuccess={() => navigate("/")}
            onNavigateToRegister={() => navigate("/register")}
            onNavigateToForgotPassword={() => navigate("/forgot-password")}
          />
        }
      />
      <Route
        path="/register"
        element={<RegisterScreen onNavigateToLogin={() => navigate("/login")} />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword onNavigateToLogin={() => navigate("/login")} />}
      />


      {/* Layout içindeki sayfalar */}
      <Route
        path="/"
        element={
          <Layout>
            <DashboardScreen />
          </Layout>
        }
      />
      <Route
        path="/cases"
        element={
          <Layout>
            <CasesScreen />
          </Layout>
        }
      />
      <Route
        path="/asistan"
        element={
          <Layout>
            <AiAsistanScreen />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <ProfileScreen />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <SettingsPage />
          </Layout>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <Layout>
            <LeaderboardPage />
          </Layout>
        }
      />
      <Route
        path="/notes" // <-- "Notlarım" için gereken route
        element={
          <Layout>
            <NotesPage />
          </Layout>
        }
      />
      <Route
        path="/forum" // <-- YORUMU KALDIRIN
        element={
          <Layout>
            <ForumPage />
          </Layout>
        }
      />
      <Route
        path="/notifications" // <-- YORUM KALDIRILDI
        element={
          <Layout>
            <NotificationsPage />
          </Layout>
        }
      />

    </Routes>


  );
};

export default App;
