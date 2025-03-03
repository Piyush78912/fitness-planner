import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WorkoutPage from './pages/WorkoutPage';
import FeedPage from './pages/FeedPage';
import MessagesPage from './pages/MessagePage';
import HandbookPage from './pages/HandbookPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Simple auth check function
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout component that includes Header for authenticated routes
const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Public routes - no header, no auth required */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes - with header, auth required */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Navigate to="/workout" replace />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/workout" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <WorkoutPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/feed" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <FeedPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MessagesPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/handbook" 
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HandbookPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);