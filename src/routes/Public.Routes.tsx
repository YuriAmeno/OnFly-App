import LoginApp from 'pages/auth/Login';
import RegisterApp from 'pages/auth/Register';

import { FC } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

export const PublicRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginApp />} />
        <Route path="/auth/register" element={<RegisterApp />} />
        <Route path="/*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
