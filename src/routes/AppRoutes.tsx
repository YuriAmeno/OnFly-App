import { DashboardApp } from 'pages';
import LoginApp from 'pages/auth/Login';
import RegisterApp from 'pages/auth/Register';

import { FC } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

// const { PUBLIC_URL } = process.env;
// basename={PUBLIC_URL}

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardApp />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/register" element={<RegisterApp />} />
        <Route path="/dashboard" element={<DashboardApp />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
