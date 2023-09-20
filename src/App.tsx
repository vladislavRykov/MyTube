import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import VideoPage from './pages/VideoPage/VideoPage';
import VideoWatchLayout from './components/layouts/VideoWatchLayout/VideoWatchLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/LoginPage/LoginPage';
import ResultsPage from './pages/ResultsPage/ResultsPage';

function App() {
  return (
    <BrowserRouter basename="/MyTube">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || ''}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="results" element={<ResultsPage />} />
          </Route>
          <Route path="/" element={<VideoWatchLayout />}>
            <Route path="watch" element={<VideoPage />} />
          </Route>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
