import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import OtpPage from './pages/OtpPage.jsx';
import AnimalSelectionPage from './pages/AnimalSelectionPage.jsx';
import BreedSelectionPage from './pages/BreedSelectionPage.jsx';
import UploadOptionsPage from './pages/UploadOptionsPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route
          path="/select-animal"
          element={
            <ProtectedRoute>
              <AnimalSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-breed"
          element={
            <ProtectedRoute>
              <BreedSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadOptionsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

