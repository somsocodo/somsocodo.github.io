import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Music } from './pages/Music';
import { NavBar } from './components/Navbar';
import { Projects } from './pages/Projects';
import { Secret } from './pages/Secret';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/music" replace />} />
        <Route path="/music" element={<Music />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
