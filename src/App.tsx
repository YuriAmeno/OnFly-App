import { AuthInit } from 'Contexts';
import LoginApp from 'pages/auth/Login';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from 'routes';

export default function App() {
  return (
    <Suspense fallback={<LoginApp />}>
      <AuthInit>
        <Outlet />
      </AuthInit>
    </Suspense>
  );
}
