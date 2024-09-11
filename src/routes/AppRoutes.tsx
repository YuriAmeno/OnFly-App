import App from 'App';
import { useAuth } from 'Contexts';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from 'routes/Private.Routes';
import LoginApp from './../pages/auth/Login';
import RegisterApp from 'pages/auth/Register';
const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          {/* <Route path="logout" element={<Logout />} /> */}
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth" element={<LoginApp />} />
              <Route path="register" element={<RegisterApp />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
