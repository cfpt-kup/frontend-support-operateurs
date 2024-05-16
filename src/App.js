// App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import NavBar from './components/Navbar/NavBar';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={
            <AuthContext.Consumer>
              {({ isAuthenticated }) => (
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              )}
            </AuthContext.Consumer>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
