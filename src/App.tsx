import React, { useState } from "react";
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


import type { Note, NoteData } from '@/types/note'; // Not tipini import et

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  // Notlar için state  
  const [notes, setNotes] = useState<Note[]>([]);

  // Not kaydetme fonksiyonu
  const handleSaveNote = (noteData: NoteData, id: string
    | null) => {
    if (id) {
      //Düzenleme 
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, id } : note
        )
      );
    } else {
      //Yeni not ekleme
      const newNote: Note = {
        id: crypto.randomUUID(),
        ...noteData,

      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }
  };

  //Silme fonksiyonu AppContenente eklendi 
  const handleDeleteNote = (id: string) => {
    if (window.confirm("Bu notu silmek istediğinize emin misiniz?")) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };
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
            <CasesScreen onSaveNote={handleSaveNote} />
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
      {/* --- 5. NotesPage artık state'i ve fonksiyonları prop olarak alıyor --- */}
      <Route
        path="/notes"
        element={
          <Layout>
            <NotesPage
              notes={notes}
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
            />
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
