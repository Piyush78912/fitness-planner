import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Pages
import WorkoutPage from './pages/WorkoutPage';
import FeedPage from './pages/FeedPage';
import MessagesPage from './pages/MessagePage';
import HandbookPage from './pages/HandbookPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import WorkoutPlans from './pages/workout/WorkoutPlans'; // Import the WorkoutPlans component
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import NutritionGuide from './pages/workout/NutritionGuide';
import MeditationSessions from './pages/workout/MeditationSessions';
import ProgressTracker from './pages/workout/ProgressTracker';
import Events from './pages/community/Events';
import SuccessStories from './pages/community/SuccessStories';
import Forums from './pages/community/Forums';
import FindPartnerPage from './pages/community/FindPartner';
import HelpCenter from './pages/support/HelpCenter';
import ContactUs from './pages/support/Contact';

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
      <Footer />
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
        
        {/* Privacy Policy */}
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <PrivacyPolicy />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Terms Of Service */}
        <Route
          path="/terms-of-service"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <TermsOfService />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/workout-plans"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <WorkoutPlans />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/nutrition-guide"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <NutritionGuide />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

          <Route
          path="/community/forums"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Forums />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

          <Route
          path="community/find-partner"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <FindPartnerPage />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

          <Route
          path="support/help-center"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <HelpCenter />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

          <Route
          path="support/contact"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ContactUs />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

          <Route
          path="/meditation-sessions"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <MeditationSessions />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress-tracker"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ProgressTracker />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/community/events"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Events />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

          <Route
          path="/community/success-stories"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <SuccessStories />
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
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);