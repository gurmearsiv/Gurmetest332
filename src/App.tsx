import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { StoryProvider } from './contexts/StoryContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Chat from './pages/Chat';
import GroupChat from './pages/GroupChat';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <StoryProvider>
          <Router>
            <div className="min-h-screen bg-slate-50">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="/chat/:userId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="/group/:groupId" element={<ProtectedRoute><GroupChat /></ProtectedRoute>} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
          </Router>
        </StoryProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;