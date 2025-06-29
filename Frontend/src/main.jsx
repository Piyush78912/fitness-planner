import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './index.css';

// Pages
import Events from './pages/community/Events';
import FindPartnerPage from './pages/community/FindPartner';
import Forums from './pages/community/Forums';
import SuccessStories from './pages/community/SuccessStories';
import FeedPage from './pages/FeedPage';
import HandbookPage from './pages/HandbookPage';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import Login from './pages/Login';
import MessagesPage from './pages/MessagePage';
import Profile from './pages/Profile';
import SavedWorkoutsPage from './pages/SavedWorkoutsPage';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import ContactUs from './pages/support/Contact';
import HelpCenter from './pages/support/HelpCenter';
import MeditationSessions from './pages/workout/MeditationSessions';
import NutritionGuide from './pages/workout/NutritionGuide';
import ProgressTracker from './pages/workout/ProgressTracker';
import WorkoutPlans from './pages/workout/WorkoutPlans'; // Import the WorkoutPlans component
import WorkoutPage from './pages/WorkoutPage';

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
      <ToastContainer position="top-right" autoClose={3000} />
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
        
        <Route
          path="/saved-workouts"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <SavedWorkoutsPage />
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