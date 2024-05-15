import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/Auth/SignupPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
