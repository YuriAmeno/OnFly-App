import { FC } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { DashboardApp } from 'pages';

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardApp />} />
      <Route path="auth/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
