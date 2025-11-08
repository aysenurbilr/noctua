import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// --- Düzeltilmiş Importlar ---
import Layout from "@/components/Layout";
import DashboardScreen from "@/pages/DashboardScreen";
import CasesScreen from "@/pages/CasesScreen";
import LoginScreen from "@/pages/LoginScreen";
import RegisterScreen from "@/pages/RegisterScreen";
import AiAsistanScreen from "@/pages/AiAsistanScreen";
import ProfileScreen from "@/pages/ProfileScreen";
import ForgotPassword from "@/pages/ForgotPassword";
import SettingsPage from "@/pages/SettingsPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import NotesPage from "@/pages/NotesPage";
import ForumPage from "@/pages/ForumPage";
import NotificationsPage from "@/pages/NotificationPage";

import type { Note, NoteData } from '@/types/note';
import type { Notification } from '@/types/notification';
import { mockNotifications } from '@/data/notificationData';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  // --- 1. Notlar State ---
  const [notes, setNotes] = useState<Note[]>([]);
  // ... (Not fonksiyonları burada) ...
  const handleSaveNote = (noteData: NoteData, id: string | null) => {
    if (id) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, ...noteData } : note
        )
      );
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        ...noteData,
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }
  };
  const handleDeleteNote = (id: string) => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }
  };

  // --- 2. Bildirimler State (Fonksiyonlar burada) ---
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleToggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;


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

      {/* --- BURASI ÇOK ÖNEMLİ --- */}
      {/* Layout içindeki her sayfaya bildirim propları gönderilmeli */}
      <Route
        path="/"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <DashboardScreen />
          </Layout>
        }
      />

      <Route
        path="/cases"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <CasesScreen onSaveNote={handleSaveNote} />
          </Layout>
        }
      />

      <Route
        path="/asistan"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <AiAsistanScreen />
          </Layout>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <LeaderboardPage />
          </Layout>
        }
      />
      <Route
        path="/forum"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <ForumPage />
          </Layout>
        }
      />

      <Route
        path="/notes"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <NotesPage
              notes={notes}
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
            />
          </Layout>
        }
      />

      {/* --- VE BURASI ÇOK ÖNEMLİ --- */}
      {/* NotificationsPage'e de prop'ların gönderilmesi gerekir */}
      <Route
        path="/notifications"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <NotificationsPage
              notifications={notifications}
              onToggleRead={handleToggleRead}
              onDeleteNotification={handleDeleteNotification}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <ProfileScreen />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout
            notifications={notifications}
            unreadCount={unreadCount}
            onToggleRead={handleToggleRead}
            onDeleteNotification={handleDeleteNotification}
            onMarkAllAsRead={handleMarkAllAsRead}
          >
            <SettingsPage />
          </Layout>
        }
      />

    </Routes>
  );
};

export default App;