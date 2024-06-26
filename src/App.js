// App.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import HomePage from './components/Homepage/HomePage'; // Corrected import path
import TrelloPage from './pages/TrelloPage/TrelloPage'; // Corrected import path
import CardDetail from './pages/CardDetail/CardDetailPage'; // Corrected import path
import NavBar from './components/Navbar/NavBar'; // Corrected import path

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={
            <AuthContext.Consumer>
              {({ isAuthenticated }) => (
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
              )}
            </AuthContext.Consumer>
          } />
          <Route path="/trello" element={
            <AuthContext.Consumer>
              {({ isAuthenticated }) => (
                isAuthenticated ? <TrelloPage /> : <Navigate to="/login" />
              )}
            </AuthContext.Consumer>
          } />
          <Route path="/cards/:cardId" element={
            <AuthContext.Consumer>
              {({ isAuthenticated }) => (
                isAuthenticated ? <CardDetail /> : <Navigate to="/login" />
              )}
            </AuthContext.Consumer>
          } />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
